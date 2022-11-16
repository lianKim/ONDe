import React from 'react';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FaCircle } from 'react-icons/fa';
import CarouselItem from './CarouselItem';

const StyledCarousel = styled(Carousel)`
  width: 50% !important;
  height: 100% !important;

  .carousel-slider {
    height: 100%;
  }

  & button {
    background: none !important;
  }
`;

function CarouselIndicator(onClickHandler, isSelected, index, label) {
  const defStyle = {
    marginLeft: 4,
    color: 'var(--color-gray100)',
    opacity: 0.6,
    cursor: 'pointer',
    position: 'relative',
    bottom: '10px',
  };
  const style = isSelected ? { ...defStyle, opacity: 1 } : { ...defStyle };
  return (
    <span
      style={style}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
      aria-label={`${label} ${index + 1}`}
    >
      <FaCircle size="6px" />
    </span>
  );
}

export default function ImageDisplayCarousel({ images, containerRef }) {
  return (
    <StyledCarousel
      autoPlay={false}
      infiniteLoop
      showThumbs={false}
      renderIndicator={CarouselIndicator}
    >
      {images?.map((image) => (
        <CarouselItem
          image={image}
          key={`${image}`}
          containerRef={containerRef}
        />
      ))}
    </StyledCarousel>
  );
}
