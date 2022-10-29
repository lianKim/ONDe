import React, { useEffect, useState } from 'react';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 14px;
  }
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
      <div>{children}</div>
      {time === 'startDate' && (
        <DatePicker
          selected={startDate ? new Date(startDate) : new Date()}
          onChange={(date) => updateDate(date)}
        />
      )}
      {time === 'endDate' && (
        <DatePicker
          selected={endDate ? new Date(endDate) : new Date()}
          onChange={(date) => updateDate(date)}
        />
      )}
    </Wrapper>
  );
}
