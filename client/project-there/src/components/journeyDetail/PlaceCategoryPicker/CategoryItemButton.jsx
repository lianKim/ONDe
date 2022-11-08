import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryIcons from './CategoryIcons';

const StyledCategoryButton = styled.button`
  color : ${(props) => (props.hover || props.selected ? 'white' : '#51A863')};
  background-color : ${(props) => (props.hover || props.selected ? '#51A863' : 'white')};
  font-size: var(--font-micro);
  padding: 0.3em 1em;
  margin: 4px 4px;
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

  const categoryButtonClick = (e) => {
    e.stopPropagation();
    // 이미 포함하고 있을 경우 제외해 줌
    if (categorySelected.includes(category)) {
      const newSelected = categorySelected.filter((element) => {
        if (element === category) {
          return false;
        }
        return true;
      });
      setCategorySelected(newSelected);
    } else {
      // 포함되어 있지 않다면 포함해 줌
      setCategorySelected((pre) => ([...pre, category]));
    }
  };

  useEffect(() => {
    if (categorySelected.includes(category)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [categorySelected.length]);

  return (
    <StyledCategoryButton
      onClick={categoryButtonClick}
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
