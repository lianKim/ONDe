import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import DatePickerContainer from './DatePickerContainer';

const Wrapper = styled.div`
  padding: 12px;
  background: lightblue;
  border: 1px solid black;
`;

export default function SchedulePicker() {
  return (
    <Wrapper>
      <div>여정 날짜 선택</div>
      <DatePickerContainer time="startDate">시작일 선택</DatePickerContainer>
      <DatePickerContainer time="endDate">종료일 선택</DatePickerContainer>
      <button type="button">확인</button>
    </Wrapper>
  );
}
