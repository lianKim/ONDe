import React from 'react';
import styled from 'styled-components';

const DetailInfoHolder = styled.textarea`
  width: 80%;
  height: 50%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;
export default function PlaceDetailInfo({ setDetailInfo }) {
  return (
    <DetailInfoHolder
      placeholder="장소에 대한 설명을 적어주세요!"
      onChange={(e) => { setDetailInfo(e.target.value); }}
    />
  );
}
