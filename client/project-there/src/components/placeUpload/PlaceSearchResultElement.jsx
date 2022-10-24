import React, { useState } from 'react';
import styled from 'styled-components';

const Result = styled.li`
  width: 100%;
  min-height: 20%;
  border: 1px solid black;
  background-color: ${(props) => (props.hoverd || props.selected ? 'palevioletred' : 'grey')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export default function PlaceSearchResultElement({ placeInfo, setHover, selected }) {
  const [placeName, placeAddress] = placeInfo;
  const { placeHover, setPlaceHover } = setHover;
  const [hoverState, setHoverState] = useState(false);
  const [clickedState, setClickedState] = useState(false);

  const handleHover = (e) => {
    e.stopPropagation();
    let { target } = e;
    if (target.tagName === 'DIV') {
      target = target.closest('li');
    }
    target = target.querySelector('div');
    if (target.dataset.key !== placeHover) {
      setPlaceHover(target.dataset.key);
    }
    setHoverState(true);
  };

  const handleLeave = (e) => {
    setHoverState(false);
  };

  return (
    <Result
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      hoverd={hoverState}
      clicked={clickedState}
      selected={selected}
    >
      <div data-key={placeName}>
        이름 :
        {' '}
        {placeName}
      </div>
      <div>
        주소 :
        {' '}
        {placeAddress}
      </div>
    </Result>
  );
}
