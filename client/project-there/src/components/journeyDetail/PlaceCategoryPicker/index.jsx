import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryItemButton from './CategoryItemButton';

const StyledCategoryPickerHolder = styled.div`
  background-color: var(--color-green200);
  color: var(--color-gray100);
  position:absolute;
  z-index: 12;
  top: 55px;
  font-size: var(--font-regular);
  width: 20%;
  min-width: 400px;
  border-radius: 0 0 30px 0;
  border-color: var(--color-gray300);
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  .categoryHolder{
    width: 100%;
    height: 140px;
    border-top: 1px solid var(--color-green100);
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 6px;
  }
`;
const categoryOptions = [
  '자연',
  '숙박',
  '음식점',
  '레저',
  '테마파크',
  '쇼핑',
  '유적지',
  '박물관',
  '공연',
  '전시회',
  '캠핑',
  '키즈',
  '기타',
];

export default function PlaceCategoryPicker({ controlCategorySelected }) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryButtonClick = () => {
    setCategoryOpen((res) => !res);
  };

  return (
    <StyledCategoryPickerHolder
      onClick={handleCategoryButtonClick}
    >
      Category
      {categoryOpen && (
        <div
          className="categoryHolder"
        >
          {categoryOptions?.map((category) => (
            <CategoryItemButton
              key={category}
              category={category}
              controlCategorySelected={controlCategorySelected}
            />
          ))}
        </div>
      )}
    </StyledCategoryPickerHolder>
  );
}
