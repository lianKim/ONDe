import React from 'react';
import styled from 'styled-components';

const CategoryHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

export default function PlaceCategoryPicker() {
  return <CategoryHolder>핀의 카테고리를 선택할 수 있는 컴포넌트</CategoryHolder>;
}
