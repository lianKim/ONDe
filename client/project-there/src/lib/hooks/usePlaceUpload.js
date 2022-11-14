import Resizer from 'react-image-file-resizer';
import exifr from 'exifr';
import customAxios from '../apis/core/instance';

// 유저가 입력하지 않은 부분을 알려주기 위한 객체
const WarningMatching = {
  latitude: '위치',
  longitude: '위치',
  title: '제목',
  text: '내용',
  placeCategory: '카테고리',
  addressName: '위치',
  region1: '위치',
  region2: '위치',
  region3: '위치',
  region4: '위치',
  placeTime: new Date(),
  placeName: '위치',
  images: '이미지 파일',
};
// 서버에 placeInfo를 제출해주기 위해 form data로 만들어주는 부분
const makeFormData = (placeInfo, journeyId, placeId) => {
  const formData = new FormData();
  const uploadTargetData = { ...placeInfo };
  let submitPossible = true;

  delete uploadTargetData.imageTakenLocations;
  const placeKeys = Object.keys(uploadTargetData);
  placeKeys.forEach((key) => {
    const placeValue = uploadTargetData[key];
    if (submitPossible) {
      if (placeValue === '' || placeValue?.length === 0) {
        window.alert(`${WarningMatching[key]}를 입력해주세요!`);
        submitPossible = false;
      }
      if (key === 'images') {
        placeValue.forEach((image) => {
          formData.append('multipartFile', image);
        });
      }
    }
  });
  delete uploadTargetData.images;
  if (journeyId !== 0) {
    uploadTargetData.journeyId = journeyId;
  }
  if (placeId !== '') {
    uploadTargetData.placeId = Number(placeId);
  }
  uploadTargetData.placeTime = uploadTargetData.placeTime.toISOString();
  formData.append(
    'request',
    new Blob([JSON.stringify(uploadTargetData)], { type: 'application/json' }),
  );
  return [formData, submitPossible];
};

const transformImageFileToBase64 = (file) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    1920,
    1920,
    'JPEG',
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    'base64',
  );
});

const resizeImageFile = (file) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    1920,
    1920,
    'JPEG',
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    'file',
  );
});

/**
 * 서버에 PlaceInfoData를 등록해주는 함수
 * @param {*} placeInfo
 * @param {*} journeyId
 * @param {*} placeId
 */
const uploadPlaceInfoData = (
  placeInfo,
  journeyId,
  navigation,
  placeId = '',
) => {
  const [formData, submitPossible] = makeFormData(
    placeInfo,
    journeyId,
    placeId,
  );
  if (submitPossible) {
    const url = '/place';
    customAxios
      .post(url, formData)
      .then((res) => {
        navigation(`/journey/${journeyId}`);
      })
      .catch((err) => {
        window.alert(`${err}로 인해 제출에 실패하였습니다.`);
        navigation(`/journey/${journeyId}`);
      });
  }
};

const transformImagesToBase64 = (acceptedImages, setResizedImages) => {
  Promise.all(
    acceptedImages?.map((image) => transformImageFileToBase64(image)),
  ).then((result) => {
    setResizedImages(result);
  });
};
const resizeImagesUpdateImageData = (acceptedImages, updateData) => {
  Promise.all(acceptedImages?.map((image) => resizeImageFile(image)))
    .then((result) => {
      updateData('images', result);
    })
    .catch((err) => console.log(err));
};
/**
 * 이미지에 있는 시간 및 위치 정보를 파악하여, placeInfo에 넣어줌
 * @param {*} acceptedImages
 * @param {*} updateData
 */
const extractImageInfoAndUpdateData = async (
  acceptedImages,
  updateData,
  isUpdate,
) => {
  if (!isUpdate) return;
  const imagesInfo = [];
  /* eslint-disable no-await-in-loop */
  /* eslint-disable no-restricted-syntax */
  for (const image of acceptedImages) {
    try {
      const info = await exifr.parse(image);
      imagesInfo.push(info);
    } catch (error) {
      console.log('이미지 파일 형식을 읽을 수 없습니다.', error);
    }
  }
  let placeVisitedTime = new Date();
  const presentTime = placeVisitedTime;
  const imageTakenLocations = [];
  const findDuplicate = [];
  imagesInfo.forEach((info) => {
    if (info) {
      const { CreateDate, latitude, longitude } = info;
      if (CreateDate) {
        placeVisitedTime =
          CreateDate < placeVisitedTime ? CreateDate : placeVisitedTime;
      }
      if (latitude && longitude) {
        if (!findDuplicate.includes(`${latitude}${longitude}`)) {
          findDuplicate.push(`${latitude}${longitude}`);
          imageTakenLocations.push({ lat: latitude, lng: longitude });
        }
      }
    }
  });
  if (imageTakenLocations.length !== 0) {
    updateData('imageTakenLocations', imageTakenLocations);
  }
  if (presentTime !== placeVisitedTime) {
    updateData('placeTime', placeVisitedTime);
  }
};
const findDateTime = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const stringTime = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;
  return stringTime;
};
const coord2AddressSearch = (lng, lat) =>
  new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result[0].address.address_name);
      } else {
        resolve('');
      }
    });
  });
const addressToPlaceNameSearch = (address) =>
  new Promise((resolve, reject) => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(result);
      } else {
        resolve([]);
      }
    });
  });
const filterSearchPlaceList = (targetList) => {
  let result = [...targetList];
  result = result.reduce((acc, cur) => {
    let include = false;
    const placeName = cur.place_name;
    const placeAddressName = cur.address_name;
    const placeLat = cur.y;
    const placeLng = cur.x;
    acc?.forEach((place) => {
      if (place[0] === placeName) {
        include = true;
      }
    });
    if (!include) {
      return [...acc, [placeName, placeAddressName, placeLat, placeLng]];
    }
    return acc;
  }, []);

  return result;
};
const makePlaceInfoLocation = (selectedInfo) => {
  const keyList = [
    'placeName',
    'addressName',
    'latitude',
    'longitude',
    'region1',
    'region2',
    'region3',
    'region4',
  ];
  const valueList = [
    selectedInfo[0],
    selectedInfo[1],
    selectedInfo[2],
    selectedInfo[3],
    selectedInfo[1].split(' ')[0],
    selectedInfo[1].split(' ')[1],
    selectedInfo[1].split(' ')[2],
    selectedInfo[1].split(' ')[3],
  ];
  return [keyList, valueList];
};
const findPointLocation = async (pointAddress) => {
  const results = await Promise.all(
    pointAddress?.map((address) => addressToPlaceNameSearch(address)),
  );
  const newResult = results.flat(1);
  let resultData = [];
  if (newResult.length !== 0) {
    resultData = newResult?.map((result) => {
      const placeName = result.place_name;
      const addressName = result.address_name;
      const latitude = result.y;
      const longitude = result.x;
      return [placeName, addressName, latitude, longitude];
    });
  }
  return resultData;
};
const findImageTakenAddress = (coordinates, setPointAddress) => {
  Promise.all(
    coordinates?.map((point) => coord2AddressSearch(point.lng, point.lat)),
  ).then((results) => {
    const resultWithoutNull = results.filter((element) => {
      if (element === '') {
        return false;
      }
      return true;
    });
    const uniqueResult = Array.from(new Set(resultWithoutNull));
    if (uniqueResult?.length !== 0) {
      setPointAddress(uniqueResult);
    }
  });
};
const findLocationByAddress = async (pointAddress, setPointPlaces) => {
  const results = await findPointLocation(pointAddress);
  if (results?.length !== 0) {
    setPointPlaces(results);
  }
};
const checkKakaoMapBound = (pointPlaces, setBounds) => {
  const newBounds = new window.kakao.maps.LatLngBounds();
  pointPlaces?.forEach((place) => {
    newBounds.extend(new window.kakao.maps.LatLng(place[2], place[3]));
  });
  setBounds(newBounds);
};

export {
  uploadPlaceInfoData,
  transformImagesToBase64,
  resizeImagesUpdateImageData,
  extractImageInfoAndUpdateData,
  findDateTime,
  addressToPlaceNameSearch,
  makePlaceInfoLocation,
  filterSearchPlaceList,
  findPointLocation,
  findImageTakenAddress,
  findLocationByAddress,
  checkKakaoMapBound,
  makeFormData,
};
