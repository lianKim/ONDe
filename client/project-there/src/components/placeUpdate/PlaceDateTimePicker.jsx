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

export default function PlaceDateTimePicker() {
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);
  const [imageTakenTime, setImageTakenTime] = useState('');

  const setPlaceTakenTime = () => {
    setPlaceInfo((pre) => ({ ...pre, placeTime: imageTakenTime }));
  };

  useEffect(() => {
    console.log(placeInfo.placeTime);
    console.log(placeInfo);
    if (placeInfo.placeTime !== '') {
      setImageTakenTime(placeInfo.placeTime);
    }
  }, [placeInfo.placeTime]);

  return (
    <StyledDateTimeHolder
      value={imageTakenTime}
      onChange={setImageTakenTime}
      onBlur={setPlaceTakenTime}
    />
  );
}
