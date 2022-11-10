import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../utills/controlAccessToken';
import { baseAxios, authAxios } from '../utills/customAxios';

const getTotalPlaceListFromServer = async (journeyId, updateTotalPlaceData) => {
  const url = `place/list?journeyId=${journeyId}`;
  const accessToken = getAccessToken();
  const customAxios = accessToken ? authAxios : baseAxios;
  try {
    const response = await customAxios.get(url);
    const { data } = response;
    updateTotalPlaceData(data);
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
    if (totalPlacesData.length === 0) return;
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

export {
  getTotalPlaceListFromServer,
  setTargetPlaceListByCategoryList,
  checkPlaceCategoryInclude,
  checkPlaceCategorySelected,
  changeKakaoMapBound,
};
