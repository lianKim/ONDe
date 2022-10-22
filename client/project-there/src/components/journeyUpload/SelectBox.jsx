import React from 'react';
import styled from 'styled-components';
import PeopleCounterInput from './PeopleCounterInput';
import RegionCategoryBox from './RegionCategoryBox';
import SchedulePicker from './SchedulePicker';
import ThemeCategoryBox from './ThemeCategoryBox';

const Wrapper = styled.div`
  margin-top: 92px;

  &::after {
    display: block;
    content: '';
    border: 0.5px solid var(--color-gray300);
    width: 100%;
    margin-top: 56px;
  }
`;

function SelectBox() {
  return (
    <Wrapper>
      <RegionCategoryBox />
      <ThemeCategoryBox />
      <PeopleCounterInput />
      <SchedulePicker />
    </Wrapper>
  );
}

export default SelectBox;
