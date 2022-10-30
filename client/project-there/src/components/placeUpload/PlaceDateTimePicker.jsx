import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import DateTimePicker from 'react-datetime-picker';
import PlaceContext from '../../contexts/PlaceContext';

const DateTimeHolder = styled.div`
  width: 100%;
  height: 10%;
  display:flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);
`;
const StyledButton = styled.button`
  margin-left: 60px;
  color: var(--color-green100);
  border: 0.5px solid var(--color-green100);
`;
const PickerHolder = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 0.5px solid var(--color-green200);
  background-color: var(--color-gray100);
  border-radius: 20px;
`;
const SelectButton = styled.button`
  background-color: var(--color-green100);
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const StyledDateTimePicker = styled(DateTimePicker)`
  button{
    color: black;
  }
  .react-calendar__month-view__days__day--weekend{
    color:red;
  }
`;

export default function PlaceDateTimePicker() {
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);
  const [imageTakenTime, setImageTakenTime] = useState('');
  const [timerOpen, setTimerOpen] = useState(false);
  const [timeSelected, setTimeSelected] = useState('');

  const setPlaceTakenTime = () => {
    setPlaceInfo((pre) => ({ ...pre, placeTime: imageTakenTime }));
  };

  const findDateTime = (time) => {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();

    const stringTime = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;
    return stringTime;
  };

  useEffect(() => {
    if (imageTakenTime !== '') {
      const time = findDateTime(imageTakenTime);
      setTimeSelected(time);
    }
  }, [imageTakenTime]);

  useEffect(() => {
    if (placeInfo.placeTime !== '') {
      setImageTakenTime(placeInfo.placeTime);
    }
  }, [placeInfo.placeTime]);

  const handleSelectButtonClick = () => {
    setTimerOpen(false);
    setPlaceTakenTime();
  };

  return (
    <DateTimeHolder>
      {!timerOpen && (
        <div>
          시간
          <StyledButton
            type="button"
            onClick={() => { setTimerOpen(true); }}
          >
            {timeSelected === '' ? '선택' : timeSelected}
          </StyledButton>
        </div>
      )}
      {timerOpen && (
        <PickerHolder>
          <StyledDateTimePicker
            value={imageTakenTime}
            onChange={setImageTakenTime}
          />
          <SelectButton
            onClick={handleSelectButtonClick}
          >
            선택
          </SelectButton>
        </PickerHolder>
      )}
    </DateTimeHolder>
  );
}
