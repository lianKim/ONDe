import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const CategoryHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const options = [
  { value: 'nature', label: '자연' },
  { value: 'accommodation', label: '숙소' },
  { value: 'restaurant', label: '음식점' },
  { value: 'leisure', label: '레저' },
  { value: 'themepark', label: '테마파크' },
  { value: 'shopping', label: '쇼핑' },
  { value: 'historicalsite', label: '유적지' },
  { value: 'museum', label: '박물관' },
  { value: 'performance', label: '공연' },
  { value: 'exhibition', label: '전시회' },
  { value: 'camping', label: '캠핑' },
  { value: 'kids', label: '키즈' },
  { value: 'etc', label: '기타' },
];

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%',
  }),
};

export default function PlaceCategoryPicker({ setCategory }) {
  return (
    <CategoryHolder>
      <Select options={options} onChange={(e) => { setCategory(e.value); }} styles={customStyles} />
    </CategoryHolder>
  );
}
