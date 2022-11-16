import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItemButton from './CategoryItemButton';
import placeCategories from '../../../lib/constants/placeCategories';
import { setTargetPlaceListByCategoryList } from '../../../lib/hooks/useJourneyDetail';
import { useTargetPlaceInfoActions } from '../../../contexts/TargetPlaceInfoContext';
import { useTotalPlaceInfoValue } from '../../../contexts/TotalPlaceInfoContext';

const StyledCategoryPickerHolder = styled.div`
  background-color: var(--color-green300);
  color: var(--color-green100);
  position: absolute;
  z-index: 12;
  top: 55px;
  font-size: var(--font-small);
  width: 250px;
  border-radius: 0 0 30px 0;
  border-color: var(--color-gray300);
  display: flex;
  flex-direction: column;
  padding: 14px 18px;
  cursor: pointer;
  letter-spacing: -0.02em;

  .categoryHolder {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 14px;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin: 0;
      margin-bottom: 16px;
      padding: 0;
      border-top: 1px solid var(--color-green100);
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin-bottom: 2px;
    }
  }
`;

export default function PlaceCategoryPicker() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const { updateTargetPlaceData } = useTargetPlaceInfoActions();
  const totalPlacesData = useTotalPlaceInfoValue();

  useEffect(() => {
    setTargetPlaceListByCategoryList(
      categorySelected,
      totalPlacesData,
      updateTargetPlaceData,
    );
  }, [categorySelected.length, totalPlacesData.length]);

  const handleCategoryButtonClick = () => {
    setCategoryOpen((res) => !res);
  };

  return (
    <StyledCategoryPickerHolder onClick={handleCategoryButtonClick}>
      Category
      {categoryOpen && (
        <div className="categoryHolder">
          {placeCategories?.map((category) => (
            <CategoryItemButton
              key={category}
              category={category}
              controlCategorySelected={[categorySelected, setCategorySelected]}
            />
          ))}
        </div>
      )}
    </StyledCategoryPickerHolder>
  );
}
