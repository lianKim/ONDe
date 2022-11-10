import React, { useState, useEffect } from 'react';
import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import CategoryIcons from './PlaceCategoryPicker/CategoryIcons';

const StyledImgHolder = styled.div`
  width: 120px;
  height: 120px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #80bde3;
  top: -125px;
  left: -40px;
  img{
    width: 90%;
    height: 90%;
  }
`;
const StyledMapMarker = styled.div`
  position: relative;
  bottom: 40px;
  .marker{
    width:40px;
    height:40px;
  }
  svg{
    position: absolute;
    background-color: var(--color-green200);
    color: white;
    left:10px;
    top:5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 2px;
  }
`;

export default function CustomMapMarker({ position, thumbnail, setFocus,
  placeId, hoverPlace, placeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const handleMarkerClick = () => {
    setFocus(placeId);
  };

  useEffect(() => {
    if (hoverPlace === placeId.toString()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [hoverPlace]);

  useEffect(() => {
    if (isOpen) {
      setImgSrc('/images/skyMapMarker.png');
    } else {
      setImgSrc('/images/greenMapMarker.png');
    }
  }, [isOpen]);

  return (
    <CustomOverlayMap
      position={position}
      yAnchor={0}
    >
      <StyledMapMarker
        onMouseOver={() => { setIsOpen(true); }}
        onMouseOut={() => { setIsOpen(false); }}
        onClick={handleMarkerClick}
      >
        <img className="marker" src={imgSrc} alt="마커 이미지" />
        <CategoryIcons category={placeCategory} />
        {isOpen && (
          <StyledImgHolder>
            <img src={thumbnail} alt="" />
          </StyledImgHolder>
        )}
      </StyledMapMarker>
    </CustomOverlayMap>

  );
}
