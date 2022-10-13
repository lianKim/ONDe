import React from 'react';
import styled from 'styled-components';

const CarouselHolder = styled.div`
  width : 50%;
  height: 100%;
  background-color : #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export default function ImageInputCarousel() {
  return <CarouselHolder>이미지를 캐러셀 형태로 받을 수 있는 컴포넌트</CarouselHolder>;
}
