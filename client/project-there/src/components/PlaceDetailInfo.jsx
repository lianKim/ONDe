import React from 'react';
import styled from 'styled-components';

const DetailInfoHolder = styled.div`
  width: 80%;
  height: 50%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

export default function PlaceDetailInfo() {
  return <DetailInfoHolder>장소에 대한 자세한 정호를 입력할 수 있는 컴포넌트</DetailInfoHolder>;
}
