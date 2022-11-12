import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';

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

function DatePickerContainer({ title, dateStr, onUpdateData }) {
  return (
    <DatePicker
      locale={ko}
      minDate={title === 'endDate' ? new Date(dateStr) : null}
      selected={dateStr.length ? new Date(dateStr) : new Date()}
      dateFormat="yyyy년 MM월 dd일"
      onChange={(date) => onUpdateData(date)}
      customInput={<CustomInput />}
    />
  );
}

export default React.memo(DatePickerContainer);
