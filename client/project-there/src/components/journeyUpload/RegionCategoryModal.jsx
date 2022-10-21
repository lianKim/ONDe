import React from 'react';
import styled from 'styled-components';
import RegionCategories from './RegionCategories';
import RegionSearchBar from './RegionSearchBar';

const CategoryBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 16px;
  background: lightgrey;
  border: 1px solid black;
`;

function RegionCategoryModal() {
  return (
    <CategoryBox>
      <RegionSearchBar />
      <RegionCategories />
      <div>선택한 카테고리들 보여주기</div>
      <button type="button">확인</button>
    </CategoryBox>
  );
}

export default RegionCategoryModal;
