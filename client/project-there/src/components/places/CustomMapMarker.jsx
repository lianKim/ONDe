import React, { useState, useEffect } from 'react';
import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const StyledImgHolder = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #80bde3;
  img{
    width: 90%;
    height: 90%;
  }
`;

export default function CustomMapMarker({ position, thumbnail }) {
  const [isOpen, setIsOpen] = useState(false);
  const imageInfo = {
    src: `${isOpen ? '/images/skyMapMarker.png' : '/images/greenMapMarker.png'}`,
    size: {
      width: 35,
      height: 35,
    },
    options: {
      offset: {
        x: 20,
        y: 35,
      },
    },
  };

  return (
    <>
      <MapMarker
        position={position}
        image={imageInfo}
        onMouseOver={() => { setIsOpen(true); }}
        onMouseOut={() => { setIsOpen(false); }}
      />
      {isOpen && (
        <CustomOverlayMap
          position={position}
          yAnchor={1.3}
        >
          <StyledImgHolder>
            <img src={thumbnail} alt="" />
          </StyledImgHolder>
        </CustomOverlayMap>
      )}
    </>

  );
}
