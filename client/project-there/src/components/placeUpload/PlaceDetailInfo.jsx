import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { usePlaceInfoValue, usePlaceInfoActions } from '../../contexts/PlaceInfoContext';

const DetailInfoHolder = styled.textarea`
  width: 100%;
  height: 35%;
  display:flex;
  justify-content: center;
  align-items: center;
  border:none;
  background-color: var(--color-grey100);
  resize: none;
  letter-spacing: -5%;
  font-size: var(--font-regular);
  font-family: 'Noto Sans KR', sans-serif;
`;
export default function PlaceDetailInfo() {
  const placeInfo = usePlaceInfoValue();
  const { updateData } = usePlaceInfoActions();
  const [placeDetail, setPlaceDetail] = useState('');
  const setPlaceDetailInfo = () => {
    updateData('text', placeDetail);
  };

  useEffect(() => {
    if (placeInfo.text !== '') {
      setPlaceDetail(placeInfo.text);
    }
  }, [placeInfo.text]);

  return (
    <DetailInfoHolder
      placeholder="장소에 대한 설명을 적어주세요!"
      onChange={(e) => { setPlaceDetail(e.target.value); }}
      onBlur={setPlaceDetailInfo}
      value={placeDetail}
    />
  );
}
