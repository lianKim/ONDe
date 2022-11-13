import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
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

const changeDateFormat = (newDate) => {
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let date = newDate.getDate();
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`;
};

function ScheduleModal({ onCloseModal, onUpdateBtnText }) {
  const { startDate, endDate } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const updateStartDate = (selectedDate) => {
    updateData('startDate', changeDateFormat(selectedDate));
  };

  const updateEndDate = (selectedDate) => {
    updateData('endDate', changeDateFormat(selectedDate));
  };

  const handleClickSelectBtn = () => {
    onUpdateBtnText(startDate, endDate);
    onCloseModal();
  };

  // 초기 값 오늘 날짜로 업데이트
  useEffect(() => {
    if (!startDate) {
      updateData('startDate', changeDateFormat(new Date()));
    }
    if (!endDate) {
      updateData('endDate', changeDateFormat(new Date()));
    }
  }, []);

  return (
    <Wrapper>
      <div>
        <DatePickerContainer
          title="startDate"
          dateStr={startDate}
          onUpdateData={updateStartDate}
        />
        <DatePickerContainer
          title="endDate"
          dateStr={endDate}
          onUpdateData={updateEndDate}
        />
      </div>
      <button type="button" onClick={onCloseModal}>
        확인
      </button>
    </Wrapper>
  );
}

export default ScheduleModal;
