import React from 'react';
import styled from 'styled-components';

const PlaceInfoHolder = styled.div`
  width: 100%;
  height: 100%;
  border : 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;

// 특정 장소의 정보를 보여주는 컴포넌트
export default function PlaceInfo() {
  return (
    <PlaceInfoHolder>
      여정들을 자세히 보여주는 부분
    </PlaceInfoHolder>
  );
}
