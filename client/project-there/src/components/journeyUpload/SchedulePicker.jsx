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
  const { startDate, endDate } = useNewJourneyValue();
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
        {startDate && endDate ? `${startDate} - ${endDate}` : '선택'}
      </button>
      {visible && <ScheduleModal onCloseModal={closeModal} />}
    </Wrapper>
  );
}
