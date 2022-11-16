import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  padding: 8px 18px;
  color: ${(props) =>
    props.hover || props.selected ? 'white' : 'var(--color-green100)'};
  background-color: ${(props) =>
    props.hover || props.selected ? 'var(--color-green100)' : 'white'};
  margin: 8px;
`;

export default function CategoryOptionButton({
  value,
  openHandle,
  categoryHandle,
}) {
  const [isHover, setIsHover] = useState(false);
  const [categorySelected, setCategorySelected] = categoryHandle;

  const handleButtonClick = () => {
    openHandle(false);
    if (categorySelected !== value) {
      setCategorySelected(value);
    }
  };

  return (
    <CustomButton
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      onClick={handleButtonClick}
      hover={isHover}
      selected={value === categorySelected}
    >
      {value}
    </CustomButton>
  );
}
