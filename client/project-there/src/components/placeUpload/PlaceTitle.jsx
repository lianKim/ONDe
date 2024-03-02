import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  usePlaceInfoValue,
  usePlaceInfoActions,
} from '../../contexts/PlaceInfoContext';

const StyledPlaceTitleHolder = styled.input`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--weight-thin);
  border: none;
  background-color: var(--color-gray100);
  font-size: 32px;
  margin-top: 5%;
  margin-left: 1%;
  letter-spacing: -5%;
  ::placeholder {
    color: var(--color-gray400);
  }
`;

export default function PlaceTitle() {
  const [title, setTitle] = useState('');
  const placeInfo = usePlaceInfoValue();
  const { updateData } = usePlaceInfoActions();

  const setPlaceTitle = () => {
    updateData('title', title);
  };

  useEffect(() => {
    if (title !== placeInfo.title) {
      setTitle(placeInfo.title);
    }
  }, [placeInfo.title]);

  return (
    <StyledPlaceTitleHolder
      type="text"
      placeholder="제목을 입력해주세요"
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onBlur={setPlaceTitle}
      value={title}
    />
  );
}
