import React, { useEffect, useState } from 'react';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  display: inline-block;
  width: 50%;
  background: lightyellow;
  border: 1px solid black;
  padding: 12px;
`;

const DatePickerTitle = styled.div`
  margin-bottom: 8px;
`;

const makeDateStr = (newDate) => {
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
    updateData(`${time}`, makeDateStr(selectedDate));
  };

  return (
    <Wrapper>
      <DatePickerTitle>{children}</DatePickerTitle>
      <DatePicker
        selected={new Date(time === 'startDate' ? startDate : endDate)}
        onChange={(date) => updateDate(date)}
      />
    </Wrapper>
  );
}
