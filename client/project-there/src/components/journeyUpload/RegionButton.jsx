import React from 'react';
import styled from 'styled-components';

const CategoryButton = styled.button`
  padding: 2px 7px;
  background: lightpink;
  border: 1px solid black;
  margin: 4px;
  white-space: nowrap;

  &.selected {
    background: red;
  }
`;

function RegionButton({ children, onSelect }) {
  return (
    <CategoryButton type="button" onClick={onSelect}>
      {children}
    </CategoryButton>
  );
}

export default RegionButton;
