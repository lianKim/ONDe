import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../utills/controlAccessToken';
import { baseAxios, authAxios } from '../utills/customAxios';

/**
 * journeyId에 해당하는 장소 리스트를 서버로부터 받아오는 함수
 * @param {number} journeyId
 * @param {*} updateTotalPlaceData
 */
const getTotalPlaceListFromServer = async ({ journeyId,
  updateTotalPlaceData, setInitialTotalPlaceList, id }) => {
  const url = `place/list?journeyId=${journeyId}`;
  const accessToken = getAccessToken();
  let customAxios = accessToken ? authAxios : baseAxios;
  customAxios = id ? authAxios : baseAxios;
  try {
    const response = await customAxios.get(url);
    const { data } = response;
    updateTotalPlaceData(data);
    setInitialTotalPlaceList(data);
  } catch (error) {
    console.log(error);
  }
};
/**
 * totalPlacesData 배열에서 categorySelected 배열 안에 있는 카테고리에 해당되는
 * 장소들을 찾아서 targetPlaceData에 넣어주는 함수
 * @param {Array} categorySelected
 * @param {Array} totalPlacesData
 * @param {object} updateTargetPlaceData
 * @returns
 */
const setTargetPlaceListByCategoryList =
  (categorySelected, totalPlacesData, updateTargetPlaceData) => {
    if (totalPlacesData.length === 0) {
      updateTargetPlaceData([]);
      return;
    }
    if (categorySelected.length === 0) {
      updateTargetPlaceData(totalPlacesData);
      return;
    }
    const newTarget = totalPlacesData?.filter((place) => {
      if (categorySelected.includes(place.placeCategory)) {
        return true;
      }
      return false;
    });
    updateTargetPlaceData(newTarget);
  };
/**
 * 카테고리 버튼을 클릭했을 때, 해당되는 카테고리가 이미 선택이 되어 있다면,
 * 선택된 카테고리에서 제거해주고, 선택되어 있지 않다면, 선택된 카테고리에 포함시켜줌
 * @param {Array<string>} categorySelected
 * @param {string} category
 * @param {object} setCategorySelected
 */
const checkPlaceCategoryInclude = (categorySelected, category, setCategorySelected) => {
  // 이미 포함하고 있을 경우 제외해 줌
  if (categorySelected.includes(category)) {
    const newSelected = categorySelected.filter((element) => {
      if (element === category) {
        return false;
      }
      return true;
    });
    setCategorySelected(newSelected);
  } else {
    // 포함되어 있지 않다면 포함해 줌
    setCategorySelected((pre) => ([...pre, category]));
  }
};
/**
 * 현재 카테고리가 선택되었는지, 선택되지 않았는지 판단하여,
 * isSelected에 반영해주는 함수
 * @param {Array<string>} categorySelected
 * @param {string} category
 * @param {object} setIsSelected
 */
const checkPlaceCategorySelected = (categorySelected, category, setIsSelected) => {
  if (categorySelected.includes(category)) {
    setIsSelected(true);
  } else {
    setIsSelected(false);
  }
};
/**
 * targetPlaceData가 변했을 때, 이에 해당되는 kakao map bound를 설정하여 return해줌
 * @param {array<object>} targetPlacesData
 * @returns
 */
const changeKakaoMapBound = (targetPlacesData) => {
  const newBounds = new window.kakao.maps.LatLngBounds();
  targetPlacesData?.forEach((place) => {
    newBounds.extend(new window.kakao.maps.LatLng(place.latitude, place.longitude));
  });
  return newBounds;
};
/**
 * targetplaceList를 받아서, 해당 장소에 포함된 시간들을 탐색하여
 * 시작일에 1을 표시하고, 날이 달라질 경우 elapsed time을 증가시켜줌
 * @param {Array<object>} targetPlacesData
 * @param {} setTimeLineList
 */
const makeTimeLineListFromTargetPlace = (targetPlacesData, setTimeLineList) => {
  if (targetPlacesData?.length !== 0) {
    let preDate = targetPlacesData[0].placeTime.slice(0, 10);
    let elapsedTime = 1;
    const timeLineList = [];
    timeLineList.push({ date: preDate, elapsedTime });
    targetPlacesData?.forEach((target) => {
      const targetDate = target.placeTime.slice(0, 10);
      if (targetDate !== preDate) {
        preDate = targetDate;
        elapsedTime += 1;
        timeLineList.push({ date: preDate, elapsedTime });
      }
      timeLineList.push(target);
    });
    setTimeLineList(timeLineList);
  }
};
/**
 * Date object를 받아서, 해당하는 시간 및 분을 string 형태로 return해주는 함수
 * @param {Date} placeTime
 * @returns {string}
 */
const changeDateToTimeString = (placeTime) => {
  const date = new Date(placeTime);
  date.setHours(date.getHours() + 9);
  const timeDivider = date.getHours() >= 12 ? 'PM' : 'AM';
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minute = date.getMinutes();
  const hourString = hour >= 10 ? hour.toString() : `0${hour}`;
  const minuteString = minute >= 10 ? minute.toString() : `0${minute}`;
  return `${hourString}:${minuteString} ${timeDivider}`;
};
/**
 * 삭제 대상인 장소 id를 받아서, totalPlaceList에서 제거해주는 함수
 * @param {array<object>} totalPlaceList
 * @param {number} targetPlaceId
 * @param {*} setTotalPlaceList
 */
const deletePlaceFromTotalPlaceList = (totalPlaceList, targetPlaceId, setTotalPlaceList) => {
  const newTotalPlaceList = totalPlaceList?.filter((place) => {
    if (place.placeId === targetPlaceId) {
      return false;
    }
    return true;
  });
  setTotalPlaceList(newTotalPlaceList);
};
/**
 * 초기 totalPlaceList와 현재 totalPlaceList를 받아서,
 * 초기에는 있지만, 현재에는 없는 place들을 서버에 삭제 요청 보내는 함수
 * @param {array<object>} initialTotalList
 * @param {array<object>} currentTotalList
 */
const deletePlaceFromServer = (initialTotalList, currentTotalList) => {
  const deleteTargetPlaces = initialTotalList.filter((place) => {
    let isTarget = true;
    currentTotalList.forEach((currentPlace) => {
      if (place.placeId === currentPlace.placeId) {
        isTarget = false;
      }
    });
    if (isTarget) {
      return true;
    }
    return false;
  });
  Promise.all(deleteTargetPlaces?.map((place) => {
    const url = `/place?placeId=${place.placeId}`;
    return authAxios.delete(url);
  })).catch((err) => {
    console.log(err);
  });
};

// commentList를 이용하여 서버에 comment 하나씩 전송해주는 함수
const addPlaceCommentList = async (commentList) => {
  const url = 'place/comment';
  /* eslint-disable no-await-in-loop */
  /* eslint-disable no-restricted-syntax */
  try {
    for (const comment of commentList) {
      const result = await authAxios.post(url, comment);
    }
  } catch (err) {
    console.log(err);
  }
};
// commment를 서버에서 제거 요청해주는 함수
const deletePlaceComment = (commentId) => {
  const url = `place/comment?commentId=${commentId}`;
  return authAxios.delete(url);
};
// comment를 서버에 수정 요청해주는 함수
const updatePlaceComment = (request) => {
  const url = 'place/comment';
  return authAxios.put(url, request);
};
/**
 * 처음 서버로부터 받은 commentList와 현재 commentList를 비교하여,
 * 댓글의 추가, 삭제, 수정 요청을 서버에 보내주는 함수
 * @param {array<object>} initialList
 * @param {array<object>} currentList
 */
const checkCommentList = (initialList, currentList) => {
  const deleteList = [];
  const addList = [];
  const fixList = [];

  // 추가 대상 및 수정 대상들을 탐색
  currentList?.forEach((element) => {
    if (element.commentId < 0) {
      const commentResult = {
        placeId: element.placeId,
        text: element.text,
      };
      addList.push(commentResult);
    } else {
      let isfixed = false;
      initialList.forEach((initialElement) => {
        if (initialElement.commentId === element.commentId) {
          if (element.text !== initialElement.text) {
            isfixed = true;
          }
        }
      });
      if (isfixed) {
        const fixedComment = {
          commentId: element.commentId,
          text: element.text,
        };
        fixList.push(fixedComment);
      }
    }
  });
  // 삭제 대상인 댓글들이 있는지 탐색
  initialList?.forEach((element) => {
    let isDelete = true;
    currentList.forEach((currentElement) => {
      if (element.commentId === currentElement.commentId) {
        isDelete = false;
      }
    });
    if (isDelete) {
      deleteList.push(element);
    }
  });

  // 추가 대상이 있을 경우 추가해줌
  if (addList?.length !== 0) {
    const reversedAddList = addList.reverse();
    addPlaceCommentList(reversedAddList);
  }
  // 삭제 대상이 있을 경우 삭제해줌
  if (deleteList?.length !== 0) {
    Promise.all(deleteList?.map((element) => deletePlaceComment(element.commentId)))
      .catch((err) => console.log(err));
  }

  // 수정 대상이 있을 경우 수정해줌
  if (fixList?.length !== 0) {
    Promise.all(fixList?.map((element) => updatePlaceComment(element)))
      .catch((err) => console.log(err));
  }
};
/**
 * 서버로부터 장소에 적힌 댓글들을 받아옴
 * @param {*} param0
 */
const getCommentListFromServer = ({ placeId, page, setIsLastPage,
  setComments, setTotalComments, setInitialComments }) => {
  const url = `place/comment?placeId=${placeId}&page=${page}&size=${10}&sort=commentId.desc`;
  baseAxios.get(url).then(({ data }) => {
    const { totalElements, last, content } = data;
    if (last) {
      setIsLastPage(true);
    }
    if (totalElements !== 0) {
      setComments((prev) => [...prev, ...content]);
      setInitialComments((prev) => [...prev, ...content]);
      if (page === 0) {
        setTotalComments(totalElements);
      }
    }
  }).catch((err) => {
    console.log(err);
  });
};
/**
 * 장소에 적힌 댓글을 삭제해주는 함수
 * @param {*} comments
 * @param {*} setComments
 * @param {*} setTotalComments
 * @param {*} deleteTarget
 */
const deleteCommentFromCommentList = (comments, setComments,
  setTotalComments, deleteTarget) => {
  const newCommentList = comments.filter((comment) => {
    if (comment.commentId === deleteTarget) {
      return false;
    }
    return true;
  });
  if (newCommentList?.length !== comments?.length) {
    setComments(newCommentList);
    setTotalComments((prev) => prev - 1);
  }
};

export {
  getTotalPlaceListFromServer,
  setTargetPlaceListByCategoryList,
  checkPlaceCategoryInclude,
  checkPlaceCategorySelected,
  changeKakaoMapBound,
  makeTimeLineListFromTargetPlace,
  changeDateToTimeString,
  deletePlaceFromTotalPlaceList,
  deletePlaceFromServer,
  checkCommentList,
  getCommentListFromServer,
  deleteCommentFromCommentList,
};
