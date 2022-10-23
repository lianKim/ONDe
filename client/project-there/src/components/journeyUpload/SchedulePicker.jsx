import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import DatePickerContainer from './DatePickerContainer';
import ScheduleModal from './ScheduleModal';

const Wrapper = styled.div`
  margin-top: 16px;

  & span {
    margin-right: 28px;
  }
`;

export default function SchedulePicker() {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <span>일정</span>
      <button type="button" onClick={handleOpenModal}>
        선택
      </button>
      {visible && <ScheduleModal onCloseModal={closeModal} />}
      {/* <div>
        <DatePickerContainer time="startDate">시작일</DatePickerContainer>
        <DatePickerContainer time="endDate">종료일</DatePickerContainer>
      </div>
      <button type="button">확인</button> */}
    </Wrapper>
  );
}
