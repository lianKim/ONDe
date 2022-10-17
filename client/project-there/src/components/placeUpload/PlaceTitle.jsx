import React from 'react';
import styled from 'styled-components';

const TitleHolder = styled.input`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;
export default function PlaceTitle({ setTitle }) {
  return (
    <TitleHolder type="text" placeholder="해당 여행 장소의 제목을 지어주세요!" onChange={(e) => { setTitle(e.target.value); }} />
  );
}
