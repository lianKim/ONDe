import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import DatePickerContainer from './DatePickerContainer';
import ScheduleModal from './ScheduleModal';

const Wrapper = styled.div`
  margin-top: 16px;

  & > span {
    margin-right: 28px;
  }

  & > button {
    letter-spacing: normal;
  }
`;

export default function SchedulePicker() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef();

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const updateBtnText = (text) => {
    btnRef.current.textContent = text;
  };

  return (
    <Wrapper>
      <span>일정</span>
      <button type="button" ref={btnRef} onClick={handleOpenModal}>
        선택
      </button>
      {visible && (
        <ScheduleModal
          onCloseModal={closeModal}
          onUpdateBtnText={updateBtnText}
        />
      )}
      {/* <div>
        <DatePickerContainer time="startDate">시작일</DatePickerContainer>
        <DatePickerContainer time="endDate">종료일</DatePickerContainer>
      </div>
      <button type="button">확인</button> */}
    </Wrapper>
  );
}
