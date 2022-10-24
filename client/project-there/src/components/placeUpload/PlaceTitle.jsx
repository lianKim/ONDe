import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PlaceContext from '../../contexts/PlaceContext';

const TitleHolder = styled.input`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
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
      placeholder="해당 여행 장소의 제목을 지어주세요!"
      onChange={(e) => { setTitle(e.target.value); }}
      onBlur={setPlaceTitle}
    />
  );
}
