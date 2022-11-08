import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItemButton from './CategoryItemButton';
import { useTargetPlaceInfoActions } from '../../../contexts/TargetPlaceInfoContext';
import placeCategories from '../../../lib/constants/placeCategories';

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

export default function PlaceCategoryPicker({ totalPlacesData }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  const { updateTargetPlaceData } = useTargetPlaceInfoActions();

  // 카테고리에 따라, totalPlacesData에서 targetPlaces data를 찾아줌
  useEffect(() => {
    if (categorySelected.length === 0) {
      if (totalPlacesData.length !== 0) {
        setTargetPlacesData(totalPlacesData);
      }
    } else {
      const newTarget = totalPlacesData?.filter((place) => {
        if (categorySelected.includes(place.placeCategory)) {
          return true;
        }
        return false;
      });
      setTargetPlacesData(newTarget);
    }
  }, [categorySelected.length, totalPlacesData.length]);
  // targetPlaces data가 변할 때마다 이를 context에 넣어줌
  useEffect(() => {
    updateTargetPlaceData(targetPlacesData);
  }, [targetPlacesData.length]);

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
