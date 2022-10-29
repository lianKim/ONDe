import React, { useState, useContext, useEffect } from 'react';
import { set } from 'react-hook-form';
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
  margin-top: 5%;
  margin-left: 1%;
  letter-spacing: -5%;
  ::placeholder{
    color: var(--color-gray500);
  }
`;

export default function PlaceTitle() {
  const [title, setTitle] = useState('');
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);

  const setPlaceTitle = () => {
    setPlaceInfo((pre) => ({ ...pre, title }));
  };

  useEffect(() => {
    if (title !== placeInfo.title) {
      setTitle(placeInfo.title);
    }
  }, [placeInfo.title]);

  return (
    <TitleHolder
      type="text"
      placeholder="제목을 입력하세요"
      onChange={(e) => { setTitle(e.target.value); }}
      onBlur={setPlaceTitle}
      value={title}
    />
  );
}
