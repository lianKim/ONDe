import React from 'react';
import styled from 'styled-components';

const DatePickerButton = styled.button`
  width: 50%;
  height: 8%;
  margin-top: 16px;
  display: inline-block;
  border: 1px solid black;
  background: white;
`;

function DatePicker() {
  return <DatePickerButton type="button">Date Picker</DatePickerButton>;
}

export default DatePicker;
