import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  usePlaceInfoValue,
  usePlaceInfoActions,
} from '../../contexts/PlaceInfoContext';

const StyledPlaceTextHolder = styled.textarea`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  resize: none;
  letter-spacing: -5%;
  font-size: var(--font-small);
  font-family: 'Noto Sans KR', sans-serif;

  ::placeholder {
    color: var(--color-gray400);
  }
`;

export default function PlaceText() {
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
    <StyledPlaceTextHolder
      placeholder="장소를 소개해주세요"
      onChange={(e) => {
        setPlaceDetail(e.target.value);
      }}
      onBlur={setPlaceDetailInfo}
      value={placeDetail}
    />
  );
}
