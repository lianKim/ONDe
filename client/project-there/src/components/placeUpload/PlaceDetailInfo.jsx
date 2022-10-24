import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PlaceContext from '../../contexts/PlaceContext';

const DetailInfoHolder = styled.textarea`
  width: 80%;
  height: 50%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;
export default function PlaceDetailInfo() {
  const [placeDetail, setPlaceDetail] = useState('');
  const [, setPlaceInfo] = useContext(PlaceContext);
  const setPlaceDetailInfo = () => {
    setPlaceInfo((pre) => ({ ...pre, text: placeDetail }));
  };
  return (
    <DetailInfoHolder
      placeholder="장소에 대한 설명을 적어주세요!"
      onChange={(e) => { setPlaceDetail(e.target.value); }}
      onBlur={setPlaceDetailInfo}
    />
  );
}
