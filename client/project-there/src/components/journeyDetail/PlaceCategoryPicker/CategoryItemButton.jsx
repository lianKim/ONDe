import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryIcons from './CategoryIcons';
import { checkPlaceCategoryInclude } from '../../../lib/hooks/useJourneyDetail';

const StyledCategoryButton = styled.button`
  color: ${(props) =>
    props.hover || props.selected
      ? 'var(--color-gray100)'
      : 'var(--color-green100)'};
  background-color: ${(props) =>
    props.hover || props.selected
      ? 'var(--color-green100)'
      : 'var(--color-gray100)'};
  font-size: 12px;
  padding: 5px 12px;
  margin: 3px;
  display: flex;
  align-items: center;
  .categoryText {
    padding-left: 2px;
  }
`;

export default function CategoryItemButton({
  category,
  controlCategorySelected,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [categorySelected, setCategorySelected] = controlCategorySelected;

  const handleCategoryButtonClick = (e) => {
    e.stopPropagation();
    const newCategorySelected = checkPlaceCategoryInclude(
      categorySelected,
      category,
    );
    setCategorySelected(newCategorySelected);
  };

  useEffect(() => {
    setIsSelected(categorySelected.includes(category));
  }, [categorySelected.length]);

  return (
    <StyledCategoryButton
      onClick={handleCategoryButtonClick}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseOut={() => {
        setIsHover(false);
      }}
      hover={isHover}
      selected={isSelected}
    >
      <CategoryIcons category={category} />
      <div className="categoryText">{category}</div>
    </StyledCategoryButton>
  );
}
