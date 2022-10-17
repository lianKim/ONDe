import React from 'react';
import styled from 'styled-components';

const CategoryBox = styled.button`
  width: 100%;
  height: 8%;
  margin-top: 16px;
  background: whitesmoke;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

function ThemeCategoryBox() {
  return <CategoryBox type="button">테마 카테고리 선택</CategoryBox>;
}

export default ThemeCategoryBox;
