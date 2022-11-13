import React from 'react';
import styled from 'styled-components';
import PeopleCounter from './PeopleCounter';
import RegionCategoryPicker from './RegionCategoryPicker';
import SchedulePicker from './SchedulePicker';
import ThemeCategoryPicker from './ThemeCategoryPicker';

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

function PickersContainer() {
  return (
    <Wrapper>
      <RegionCategoryPicker />
      <ThemeCategoryPicker />
      <PeopleCounter />
      <SchedulePicker />
    </Wrapper>
  );
}

export default PickersContainer;
