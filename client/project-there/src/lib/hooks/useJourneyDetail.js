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

export { getTotalPlaceListFromServer, setTargetPlaceListByCategoryList };
