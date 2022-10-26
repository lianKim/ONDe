import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import PlaceContext from '../../contexts/PlaceContext';
import CategoryOptionButton from './CategoryOptionButton';

const CategoryHolder = styled.div`
  width: 100%;
  height: 10%;
  display:flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);
`;
const StyledButton = styled.button`
  margin-left: 30px;
  color: var(--color-green100);
  border: 0.5px solid var(--color-green100);
`;
const PickerHolder = styled.div`
  width: 100%;
  height: 400px;
  bottom: 50px;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  position: relative;
  border: 0.5px solid var(--color-green200);
  background-color: var(--color-gray100);
  border-radius: 20px;
`;
const options = [
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

export default function PlaceCategoryPicker() {
  const [, setPlaceInfo] = useContext(PlaceContext);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('');

  useEffect(() => {
    if (categorySelected !== '') {
      setPlaceInfo((pre) => ({ ...pre, placeCategory: categorySelected }));
    }
  }, [categorySelected]);

  return (
    <CategoryHolder>
      {!categoryOpen && (
      <div>
        카테고리
        <StyledButton
          type="button"
          onClick={() => { setCategoryOpen(true); }}
        >
          {categorySelected === '' ? '선택' : categorySelected}
        </StyledButton>
      </div>
      )}
      {categoryOpen && (
      <PickerHolder>
        {options?.map((value) => (
          <CategoryOptionButton
            key={value}
            value={value}
            openHandle={setCategoryOpen}
            categoryHandle={[categorySelected, setCategorySelected]}
          />
        ))}
      </PickerHolder>
      )}
    </CategoryHolder>
  );
}
