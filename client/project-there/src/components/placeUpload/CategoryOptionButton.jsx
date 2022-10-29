import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  height: 39px;
  color: ${(props) => (props.hover || props.selected ? 'white' : '#51A863')};
  background-color: ${(props) => (props.hover || props.selected ? '#51A863' : 'white')};;
  margin: 10px;
`;

export default function CategoryOptionButton({ value, openHandle, categoryHandle }) {
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
      onMouseOver={() => { setIsHover(true); }}
      onMouseOut={() => { setIsHover(false); }}
      onClick={handleButtonClick}
      hover={isHover}
      selected={value === categorySelected}
    >
      {value}
    </CustomButton>
  );
}
