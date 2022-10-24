import React from 'react';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from './CarouselItem';

const StyledCarousel = styled(Carousel)`
  width: 50%;
  height: 100%;
`;

export default function ImageDisplayCarousel({ images, containerRef }) {
  return (
    <StyledCarousel
      autoPlay={false}
      infiniteLoop
      showThumbs={false}
    >
      {images?.map((image) => (
        <CarouselItem
          image={image}
          key={image}
          containerRef={containerRef}
        />
      ))}
    </StyledCarousel>
  );
}
