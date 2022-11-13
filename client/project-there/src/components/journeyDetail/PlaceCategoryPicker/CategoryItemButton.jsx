import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryIcons from './CategoryIcons';
import { checkPlaceCategoryInclude, checkPlaceCategorySelected } from '../../../lib/hooks/useJourneyDetail';

const StyledCategoryButton = styled.button`
  color : ${(props) => (props.hover || props.selected ? 'white' : '#51A863')};
  background-color : ${(props) => (props.hover || props.selected ? '#51A863' : 'white')};
  font-size: var(--font-micro);
  padding: 6px 14px;
  margin: 2px 4px;
  display: flex;
  align-items: center;
  .categoryText{
    padding-left: 2px;
  }
`;

export default function CategoryItemButton({ category, controlCategorySelected }) {
  const [isHover, setIsHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [categorySelected, setCategorySelected] = controlCategorySelected;

  const handleCategoryButtonClick = (e) => {
    e.stopPropagation();
    checkPlaceCategoryInclude(categorySelected, category, setCategorySelected);
  };

  useEffect(() => {
    checkPlaceCategorySelected(categorySelected, category, setIsSelected);
  }, [categorySelected.length]);

  return (
    <StyledCategoryButton
      onClick={handleCategoryButtonClick}
      onMouseOver={(() => { setIsHover(true); })}
      onMouseOut={() => { setIsHover(false); }}
      hover={isHover}
      selected={isSelected}
    >
      <CategoryIcons category={category} />
      <div
        className="categoryText"
      >
        {category}
      </div>
    </StyledCategoryButton>
  );
}
