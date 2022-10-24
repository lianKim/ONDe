import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || '100px'};
  border-radius: 20px;
  overflow: hidden;
`;

export default function CarouselItem({ image, containerRef }) {
  const [height, setHeight] = useState('');
  useEffect(() => {
    if (containerRef.current) {
      setHeight(`${containerRef.current.offsetHeight - 20}px`);
    }
  }, [containerRef]);

  return (
    <ItemContainer
      height={height}
    >
      <img src={image} alt="" />
    </ItemContainer>
  );
}
