import React from 'react';
import styled from 'styled-components';
import DateTimePicker from 'react-datetime-picker';

const DateTimeHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PlaceDateTimePicker({ placeTimeData }) {
  const [imageTakenTime, setImageTakenTime] = placeTimeData;

  return (
    <DateTimeHolder>
      <DateTimePicker value={imageTakenTime} onChange={setImageTakenTime} />
    </DateTimeHolder>
  );
}
