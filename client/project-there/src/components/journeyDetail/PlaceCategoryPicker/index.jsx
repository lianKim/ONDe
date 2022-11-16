import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItemButton from './CategoryItemButton';
import placeCategories from '../../../lib/constants/placeCategories';
import { findTargetPlaceListByCategoryList } from '../../../lib/hooks/useJourneyDetail';
import { useTargetPlaceInfoActions } from '../../../contexts/TargetPlaceInfoContext';
import { useTotalPlaceInfoValue } from '../../../contexts/TotalPlaceInfoContext';

const StyledCategoryPickerHolder = styled.div`
  background-color: var(--color-green200);
  color: var(--color-green100);
  position:absolute;
  z-index: 12;
  top: 55px;
  font-size: var(--font-regular);
  width:320px;
  border-radius: 0 0 30px 0;
  border-color: var(--color-gray300);
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  cursor:pointer;
  .categoryHolder{
    width: 100%;
    height: 200px;
    border-top: 1px solid var(--color-green100);
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 6px;
  }
`;

export default function PlaceCategoryPicker() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const { updateTargetPlaceData } = useTargetPlaceInfoActions();
  const totalPlacesData = useTotalPlaceInfoValue();

  useEffect(() => {
    const newTargetPlacesData = findTargetPlaceListByCategoryList(
      categorySelected, totalPlacesData);
    updateTargetPlaceData(newTargetPlacesData);
  }, [categorySelected.length, totalPlacesData.length]);

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
