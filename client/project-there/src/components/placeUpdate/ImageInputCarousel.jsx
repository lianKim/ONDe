import React from 'react';
import styled from 'styled-components';
import CustomCarousel from './CustomCarousel';

const CarouselHolder = styled.div`
  width : 50%;
  height: 100%;
  background-color : #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 1%;
  box-sizing: border-box;
`;

export default function ImageInputCarousel({ initialImages }) {
  return (
    <CarouselHolder>
      <CustomCarousel initialImages={initialImages} />
    </CarouselHolder>
  );
}
