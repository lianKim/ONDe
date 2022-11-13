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

function DatePickerContainer({ selectedDate, onUpdateData, minStartDate }) {
  return (
    <DatePicker
      locale={ko}
      minDate={minStartDate ? new Date(minStartDate) : null}
      selected={selectedDate.length ? new Date(selectedDate) : new Date()}
      dateFormat="yyyy년 MM월 dd일"
      onChange={(date) => onUpdateData(date)}
      customInput={<CustomInput />}
    />
  );
}

export default React.memo(DatePickerContainer);
