import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import CustomDropZone from './CustomDropZone';
import { usePlaceInfoActions, usePlaceInfoValue } from '../../contexts/PlaceInfoContext';
import CarouselItem from './CarouselItem';
import {
  transformImagesToBase64,
  resizeImagesUpdateImageData,
  extractImageInfoAndUpdateData,
} from '../../lib/hooks/usePlaceUpload';

const StyledCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .carousel-slider{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function CustomCarousel({ containerRef }) {
  const [acceptedImages, setAcceptedImages] = useState([]);
  const [, setRejectedImages] = useState([]);
  const [transformedImages, setTransformedImages] = useState([]);
  const { updateData } = usePlaceInfoActions();
  const [containerHeight, setContainerHeight] = useState(300);
  const placeInfo = usePlaceInfoValue();
  const [isUpdate, setIsUpdate] = useState(true);

  const addAcceptedImages = (preImages, curImages) => {
    setAcceptedImages([...preImages, ...curImages]);
  };
  const addRejectedImages = (curImages) => {
    setRejectedImages([...curImages]);
  };

  useEffect(() => {
    if (placeInfo?.images?.length !== 0 && isUpdate) {
      setAcceptedImages(placeInfo?.images);
    }
  }, [placeInfo?.images?.length, isUpdate]);

  useEffect(() => {
    setIsUpdate(false);
    transformImagesToBase64(acceptedImages, setTransformedImages);
    resizeImagesUpdateImageData(acceptedImages, updateData);
    extractImageInfoAndUpdateData(acceptedImages, updateData);
  }, [acceptedImages?.length]);

  useEffect(() => {
    if (containerRef) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  return (
    <StyledCarousel
      autoPlay={false}
      infiniteLoop
      showThumbs={false}
    >
      {transformedImages?.map((imageUrl, index) => (
        <CarouselItem
          key={imageUrl}
          src={imageUrl}
          imgControl={[acceptedImages, setAcceptedImages]}
          number={index}
          height={containerHeight}
        />
      ))}
      <CustomDropZone
        info={[acceptedImages, addAcceptedImages, addRejectedImages]}
        height={containerHeight}
      />
    </StyledCarousel>
  );
}
