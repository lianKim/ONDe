import React, { useEffect } from 'react';
import styled from 'styled-components';

const ItemHolder = styled.div`
  position: relative;
  max-height: 500px;
`;
const ImgHolder = styled.img`
  object-fit: cover;
`;
const ButtonHolder = styled.button`
  z-index: 12;
  color:red;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba( 255, 255, 255, 0.5 );
  border: none;
`;

export default function CarouselItem({ src, imgControl, number }) {
  const [acceptedImages, setAcceptedImages] = imgControl;
  const handleEraseClick = () => {
    setAcceptedImages((pre) => pre.filter((element, index) => {
      if (index === number) {
        return false;
      }
      return true;
    }));
  };

  return (
    <ItemHolder>
      <ImgHolder src={src} alt="" />
      <ButtonHolder onClick={handleEraseClick}>지우기</ButtonHolder>
    </ItemHolder>
  );
}
