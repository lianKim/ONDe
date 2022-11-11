import { authAxios, baseAxios } from '../utills/customAxios';
import { makeFormData } from './usePlaceUpload';

const setInitialSetting = async (placeId, updateMultiData) => {
  const url = `place?placeId=${placeId}`;
  const { data } = await authAxios.get(url);
  const { imageUrls } = data;
  const keyList = [
    'latitude',
    'longitude',
    'title',
    'text',
    'placeCategory',
    'addressName',
    'region1',
    'region2',
    'region3',
    'region4',
    'placeTime',
    'placeName',
    'journeyId',
    'images',
  ];

  // 이미지 url들을 이용하여 서버에서 이미지 파일들을 받아줌
  const imageFilesRequest = await Promise.all(
    imageUrls.map((imageUrl) => {
      const tmpUrl = imageUrl.split('/');
      const imageRequestUrl = `image/file?imageUrl=${tmpUrl[tmpUrl.length - 1]}`;
      return baseAxios.get(imageRequestUrl, { responseType: 'arraybuffer' });
    }),
  );
  const imageFiles = imageFilesRequest.map((request) => {
    const baseData = request.data;
    const imageBolb = new Blob([baseData], { type: 'image/png' });
    const imageFile = new File([imageBolb], '이미지수정.png');
    return imageFile;
  });

  const valueList = keyList.map((key) => {
    if (key === 'placeTime') {
      const time = data[key];
      const dateTime = new Date(time);
      dateTime.setHours(dateTime.getHours() + 9);
      return dateTime;
    }
    if (key === 'images') {
      return imageFiles;
    }
    return data[key];
  });
  updateMultiData(keyList, valueList);
};

/**
 * 서버에 등록된 placeInfoData를 수정해주는 함수
 * @param {*} placeInfo
 * @param {*} journeyId
 * @param {*} navigation
 * @param {*} placeId
 */
const updatePlaceInfoServerData = (placeInfo, journeyId, navigation, placeId = '') => {
  const [formData, submitPossible] = makeFormData(placeInfo, journeyId, placeId);
  if (submitPossible) {
    const url = '/place';
    authAxios
      .put(url, formData)
      .then((res) => {
        navigation(`/journey/${placeInfo.journeyId}`);
      })
      .catch((err) => {
        window.alert(`${err}로 인해 제출에 실패하였습니다.`);
        navigation(`/journey/${placeInfo.journeyId}`);
      });
  }
};

export {
  setInitialSetting,
  updatePlaceInfoServerData,
};
