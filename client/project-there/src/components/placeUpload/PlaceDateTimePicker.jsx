import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import DateTimePicker from 'react-datetime-picker';
import PlaceContext from '../../contexts/PlaceContext';

const StyledDateTimeHolder = styled(DateTimePicker)`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateTimeHolder = styled.div`
  width: 80%;
  height: 10%;
  display:flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);
`;

const StyledButton = styled.button`
  margin-left: 30px;
  color: var(--color-green100);
`;

export default function PlaceDateTimePicker() {
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);
  const [imageTakenTime, setImageTakenTime] = useState(placeInfo.placeTime);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timeSelected, setTimeSelected] = useState('');

  const setPlaceTakenTime = () => {
    setPlaceInfo((pre) => ({ ...pre, placeTime: imageTakenTime }));
  };

  useEffect(() => {
    setImageTakenTime(placeInfo.placeTime);
  }, [placeInfo.placeTime]);
  return (
    <DateTimeHolder>
      {!timerOpen && (
        <div>
          시간 :
          <StyledButton
            type="button"
            onClick={() => { setTimerOpen(true); }}
          >
            {timeSelected === '' ? '선택' : timeSelected}
          </StyledButton>
        </div>
      )}
      {timerOpen}
    </DateTimeHolder>
  );
}
