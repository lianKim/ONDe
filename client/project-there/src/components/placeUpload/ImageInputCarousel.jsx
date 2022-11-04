import React, { useRef } from 'react';
import styled from 'styled-components';
import CustomCarousel from './CustomCarousel';

const CarouselHolder = styled.div`
  width : 50%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dde4e5;
  box-sizing: border-box;
`;

export default function ImageInputCarousel() {
  const containerRef = useRef();
  return (
    <CarouselHolder
      ref={containerRef}
    >
      <CustomCarousel containerRef={containerRef} />
    </CarouselHolder>
  );
}
