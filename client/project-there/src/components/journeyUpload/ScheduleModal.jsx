import React from 'react';
import styled from 'styled-components';
import DatePickerContainer from './DatePickerContainer';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: tomato;
  padding: 72px 60px;
  background: var(--color-gray100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  & > button {
    margin-top: 60px;
  }
`;

function ScheduleModal({ onCloseModal }) {
  return (
    <Wrapper>
      <div>
        <DatePickerContainer time="startDate">시작일</DatePickerContainer>
        <DatePickerContainer time="endDate">종료일</DatePickerContainer>
      </div>
      <button type="button" onClick={onCloseModal}>
        확인
      </button>
    </Wrapper>
  );
}

export default ScheduleModal;
