import React, { useState, useEffect } from 'react';
import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import CategoryIcons from './PlaceCategoryPicker/CategoryIcons';

const StyledImgHolder = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
  bottom:150px;
  right:50px;
  background-color: #80bde3;
  img{
    width: 90%;
    height: 90%;
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
      setImgSrc('blue');
    } else {
      setImgSrc('green');
    }
  }, [isOpen]);

  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: `/images/mapMarker/${imgSrc} ${placeCategory}.png`, // 마커이미지의 주소입니다
          size: {
            width: 35,
            height: 35,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 16,
              y: 28,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
        onClick={handleMarkerClick}
        onMouseOver={() => { setIsOpen(true); }}
        onMouseOut={() => { setIsOpen(false); }}
      />
      <CustomOverlayMap
        position={position}
        yAnchor={1}
      >
        {isOpen && (
          <StyledImgHolder>
            <img src={thumbnail} alt="" />
          </StyledImgHolder>
        )}
      </CustomOverlayMap>
    </>
  );
}
