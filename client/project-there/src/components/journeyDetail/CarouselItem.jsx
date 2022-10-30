import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ImgContainer = styled.img`
  object-fit: cover;
  height: ${(props) => props.height || '100px'};
  border-radius: 20px;
  overflow: hidden;
  width: 200px;
`;

export default function CarouselItem({ image, containerRef }) {
  const [height, setHeight] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight - 30);
    }
  }, [containerRef.current]);
  return (
    <ImgContainer
      src={image}
      alt=""
      height={height}
    />
  );
}
