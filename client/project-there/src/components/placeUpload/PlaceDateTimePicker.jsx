import React from 'react';
import styled from 'styled-components';

const DateTimeHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;

export default function PlaceDateTimePicker() {
  return <DateTimeHolder>핀의 날짜와 시간을 선택할 수 있는 컴포넌트</DateTimeHolder>;
}
