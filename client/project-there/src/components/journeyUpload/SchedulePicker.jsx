import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
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

  const updateBtnText = useCallback((date1, date2) => {
    const date1KR = changeDateFormatKR(date1);
    const date2KR = changeDateFormatKR(date2);
    setBtnText(`${date1KR} - ${date2KR}`);
  }, []);

  return (
    <Wrapper>
      <span>일정</span>
      <button type="button" onClick={handleOpenModal}>
        {btnText || '선택'}
      </button>
      {visible && (
        <ScheduleModal
          onCloseModal={closeModal}
          onUpdateBtnText={updateBtnText}
        />
      )}
    </Wrapper>
  );
}
