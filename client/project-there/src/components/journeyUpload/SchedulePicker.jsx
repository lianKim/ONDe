import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/NewJourneyContext';
import ScheduleModal from './ScheduleModal';

const Wrapper = styled.div`
  margin-top: 16px;

  & > span {
    margin-right: 28px;
  }

  & > button {
    font-family: poppins;
    letter-spacing: normal;
    line-height: 1.2;
  }
`;

export default function SchedulePicker() {
  const { startDate, endDate } = useNewJourneyValue();
  const [visible, setVisible] = useState(false);
  const [btnText, setBtnText] = useState('');

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const changeDateFormatKR = (date) => {
    const newDate = date.split('-');
    return `${newDate[0]}년 ${newDate[1]}월 ${newDate[2]}일`;
  };

  useEffect(() => {
    if (!startDate || !endDate) return;

    const startDateKR = changeDateFormatKR(startDate);
    const endDateKR = changeDateFormatKR(endDate);
    setBtnText(`${startDateKR} - ${endDateKR}`);
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <span>일정</span>
      <button type="button" onClick={handleOpenModal}>
        {btnText || '선택'}
      </button>
      {visible && <ScheduleModal onCloseModal={closeModal} />}
    </Wrapper>
  );
}
