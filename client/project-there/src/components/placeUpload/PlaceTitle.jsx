import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PlaceContext from '../../contexts/PlaceContext';

const TitleHolder = styled.input`
  width: 100%;
  height: 10%;
  display:flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--weight-thin);
  border: none;
  background-color: var(--color-gray100);
  font-size: var(--font-large);
  color: var(--color-gray500);
  margin-top: 5%;
  margin-left: 1%;
  letter-spacing: -5%;
`;

export default function PlaceTitle() {
  const [title, setTitle] = useState();
  const [, setPlaceInfo] = useContext(PlaceContext);

  const setPlaceTitle = () => {
    setPlaceInfo((pre) => ({ ...pre, title }));
  };

  return (
    <TitleHolder
      type="text"
      placeholder="제목을 입력하세요"
      onChange={(e) => { setTitle(e.target.value); }}
      onBlur={setPlaceTitle}
    />
  );
}
