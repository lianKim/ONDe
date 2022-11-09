import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/newJourney';
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
    padding: 0 14px;
    position: relative;
    display: flex;
    gap: 8px;
    border: 0.5px solid var(--color-green100);
    border-radius: 20px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 1px);
      left: calc(50% - 4px);
      width: 8px;
      height: 1px;
      background: var(--color-green100);
    }
  }

  & > button {
    margin-top: 60px;
  }
`;

function ScheduleModal({ onCloseModal, onUpdateBtnText }) {
  return (
    <Wrapper>
      <div>
        <DatePickerContainer time="startDate" />
        {/* <span /> */}
        <DatePickerContainer time="endDate" />
      </div>
      <button type="button" onClick={onCloseModal}>
        확인
      </button>
    </Wrapper>
  );
}

export default ScheduleModal;
