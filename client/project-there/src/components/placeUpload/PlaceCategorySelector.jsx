import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  usePlaceInfoValue,
  usePlaceInfoActions,
} from '../../contexts/PlaceInfoContext';
import CategoryOptionButton from './CategoryOptionButton';
import placeCategories from '../../lib/constants/placeCategories';

const StyledCategorySelectorHolder = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);

  .displayButton {
    margin-left: 30px;
    color: var(--color-green100);
    border: 0.5px solid var(--color-green100);
    padding: 0.5em 1em;
  }

  .categoryPickerHolder {
    width: 700px;
    height: 400px;
    bottom: 40px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    position: relative;
    border: 0.5px solid var(--color-green200);
    background-color: var(--color-gray100);
    border-radius: 20px;
  }
`;

export default function PlaceCategoryPicker() {
  const placeInfo = usePlaceInfoValue();
  const { updateData } = usePlaceInfoActions();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('');

  useEffect(() => {
    if (categorySelected !== '') {
      updateData('placeCategory', categorySelected);
    }
  }, [categorySelected]);

  useEffect(() => {
    if (placeInfo.placeCategory !== '') {
      setCategorySelected(placeInfo.placeCategory);
    }
  }, [placeInfo.placeCategory]);

  return (
    <StyledCategorySelectorHolder>
      {!categoryOpen && (
        <div>
          카테고리
          <button
            type="button"
            onClick={() => {
              setCategoryOpen(true);
            }}
            className="displayButton"
          >
            {categorySelected === '' ? '선택' : categorySelected}
          </button>
        </div>
      )}
      {categoryOpen && (
        <div className="categoryPickerHolder">
          {placeCategories?.map((value) => (
            <CategoryOptionButton
              key={value}
              value={value}
              openHandle={setCategoryOpen}
              categoryHandle={[categorySelected, setCategorySelected]}
            />
          ))}
        </div>
      )}
    </StyledCategorySelectorHolder>
  );
}
