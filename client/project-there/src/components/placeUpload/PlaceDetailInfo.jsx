import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PlaceContext from '../../contexts/PlaceContext';

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
  const [placeDetail, setPlaceDetail] = useState('');
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);
  const setPlaceDetailInfo = () => {
    setPlaceInfo((pre) => ({ ...pre, text: placeDetail }));
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
