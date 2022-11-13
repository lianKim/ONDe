import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import DatePickerContainer from './DatePickerContainer';

// const Wrapper = styled.div`
//   position: fixed;
//   top: 60px;
//   right: 0;
//   width: calc(100vw - 100vh + 45px);
//   height: calc(100vh - 60px);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background: var(--color-gray100);
//   z-index: 1;
// `;

const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: calc(100vw - 100vh + 45px);
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-gray100);
  z-index: 1;

  & > div {
    padding: 0 14px;
    position: relative;
    display: flex;
    gap: 8px;
    border: 0.5px solid var(--color-green200);
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
    margin-top: 40px;
    color: var(--color-gray200);
    background: var(--color-green200);
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

  // 시작 날짜 < 종료 날짜 인 경우, 종료 날짜를 시작 날짜로 변경
  useEffect(() => {
    const startDateNum = startDate.split('-').join('');
    const endDateNum = endDate.split('-').join('');

    if (startDateNum > endDateNum) {
      updateData('endDate', changeDateFormat(new Date(startDate)));
    }
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <div>
        <DatePickerContainer
          selectedDate={startDate}
          onUpdateData={updateStartDate}
        />
        <DatePickerContainer
          selectedDate={endDate}
          onUpdateData={updateEndDate}
          minStartDate={startDate}
        />
      </div>
      <button type="button" onClick={handleClickSelectBtn}>
        확인
      </button>
    </Wrapper>
  );
}

export default ScheduleModal;
