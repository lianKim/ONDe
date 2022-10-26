import React, { useState, useContext, useEffect } from 'react';
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
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);
  const setPlaceDetailInfo = () => {
    setPlaceInfo((pre) => ({ ...pre, text: placeDetail }));
  };

  useEffect(() => {
    if (placeInfo.text) {
      console.log(placeInfo.text);
    }
  }, [placeInfo.text]);

  return (
    <DetailInfoHolder
      placeholder="장소에 대한 설명을 적어주세요!"
      onChange={(e) => { setPlaceDetail(e.target.value); }}
      onBlur={setPlaceDetailInfo}
    />
  );
}
