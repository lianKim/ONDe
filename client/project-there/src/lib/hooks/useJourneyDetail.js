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

const checkPlaceCategorySelected = (categorySelected, category, setIsSelected) => {
  if (categorySelected.includes(category)) {
    setIsSelected(true);
  } else {
    setIsSelected(false);
  }
};

export {
  getTotalPlaceListFromServer,
  setTargetPlaceListByCategoryList,
  checkPlaceCategoryInclude,
  checkPlaceCategorySelected,
};
