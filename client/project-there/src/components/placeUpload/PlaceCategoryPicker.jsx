import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import PlaceContext from '../../contexts/PlaceContext';

const CategoryHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const options = [
  { value: '자연', label: '자연' },
  { value: '숙박', label: '숙박' },
  { value: '음식점', label: '음식점' },
  { value: '레저', label: '레저' },
  { value: '테마파크', label: '테마파크' },
  { value: '쇼핑', label: '쇼핑' },
  { value: '유적지', label: '유적지' },
  { value: '박물관', label: '박물관' },
  { value: '공연', label: '공연' },
  { value: '전시회', label: '전시회' },
  { value: '캠핑', label: '캠핑' },
  { value: '키즈', label: '키즈' },
  { value: '기타', label: '기타' },
];

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%',
  }),
};

export default function PlaceCategoryPicker() {
  const [, setPlaceInfo] = useContext(PlaceContext);
  const setCategory = (e) => {
    setPlaceInfo((pre) => ({ ...pre, placeCategory: e.value }));
  };
  return (
    <CategoryHolder>
      <Select options={options} onChange={setCategory} styles={customStyles} />
    </CategoryHolder>
  );
}
