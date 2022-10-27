import React, { useEffect } from 'react';
import styled from 'styled-components';

const ItemHolder = styled.div`
  position: relative;
  height: ${(props) => `${props.height}px`};
  & img{
    object-fit: cover;
    height: ${(props) => `${props.height}px`};
  }
  & button{
    z-index: 12;
    color:red;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: rgba( 255, 255, 255, 0.5 );
    border: none;
  }
`;

export default function CarouselItem({ src, imgControl, number, height }) {
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
    <ItemHolder
      height={height}
    >
      <img src={src} alt="" />
      <button type="button" onClick={handleEraseClick}>지우기</button>
    </ItemHolder>
  );
}
