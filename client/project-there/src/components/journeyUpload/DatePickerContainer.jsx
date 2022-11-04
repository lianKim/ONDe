import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';

import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputButton = styled.button`
  letter-spacing: normal;
  font-family: poppins;
  border: 0px solid black;

  padding: 6px 14px;
`;

function CustomInput({ value, onClick }) {
  return (
    <InputButton type="button" onClick={onClick}>
      {value}
    </InputButton>
  );
}

const changeDateFormat = (newDate) => {
  const year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let date = newDate.getDate();
  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`;
};

export default function DatePickerContainer({ time, children }) {
  // setDefaultLocale('es');

  const { startDate, endDate } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const updateDate = (selectedDate) => {
    updateData(`${time}`, changeDateFormat(selectedDate));
  };

  useEffect(() => {
    updateData(`${time}`, changeDateFormat(new Date()));
  }, []);

  return (
    <Wrapper>
      <div>{children}</div>
      {time === 'startDate' && (
        <DatePicker
          locale={ko}
          selected={startDate.length ? new Date(startDate) : new Date()}
          dateFormat="yyyy년 MM월 dd일"
          placeholderText="시작일 선택"
          onChange={(date) => updateDate(date)}
          customInput={<CustomInput />}
        />
      )}
      {time === 'endDate' && (
        <DatePicker
          locale={ko}
          minDate={new Date(startDate)}
          selected={endDate.length ? new Date(endDate) : new Date()}
          dateFormat="yyyy년 MM월 dd일"
          placeholderText="종료일 선택"
          onChange={(date) => updateDate(date)}
          customInput={<CustomInput />}
        />
      )}
    </Wrapper>
  );
}
