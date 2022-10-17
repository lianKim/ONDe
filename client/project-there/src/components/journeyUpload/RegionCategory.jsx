import React from 'react';
import styled from 'styled-components';

const CategoryButton = styled.button`
  padding: 2px 7px;
  background: lightpink;
  border: 1px solid black;
  margin-right: 4px;
`;

function RegionCategory({ children }) {
  return <CategoryButton type="button">{children}</CategoryButton>;
}

export default RegionCategory;
