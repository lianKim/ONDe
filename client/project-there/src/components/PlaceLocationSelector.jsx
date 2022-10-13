import React from 'react';
import styled from 'styled-components';

const LocationHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

export default function PlaceLocationSelector() {
  return <LocationHolder>장소의 위치를 선택할 수 있는 컴포넌트</LocationHolder>;
}
