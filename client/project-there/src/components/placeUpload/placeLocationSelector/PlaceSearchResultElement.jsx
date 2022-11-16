import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Result = styled.li`
  width: 100%;
  min-height: 96px;
  padding: 12px;
  border-bottom: 0.5px solid var(--color-gray300) !important;
  background-color: ${(props) =>
    props.hoverd || props.selected
      ? 'var(--color-green300)'
      : 'var(--color-gray100)'};
  color: ${(props) =>
    props.hoverd || props.selected
      ? 'var(--color-gray100)'
      : 'var(--color-green200)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: var(--font-micro);

  & div:first-child {
    font-weight: var(--weight-semi-bold);
    font-size: var(--font-micro);
  }

  & div:last-child {
    font-size: 12px;
    margin-top: 8px;
  }
`;

export default function PlaceSearchResultElement({
  placeInfo,
  setHover,
  selected,
  setAddressHover,
}) {
  const [placeName, placeAddress] = placeInfo;
  const { placeHover, setPlaceHover } = setHover;
  const { placeAddressHover, setPlaceAddressHover } = setAddressHover;
  const [hoverState, setHoverState] = useState(false);
  const [clickedState, setClickedState] = useState(false);
  const placeRef = useRef();

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
    if (target.dataset.address !== placeAddressHover) {
      setPlaceAddressHover(target.dataset.address);
    }
    setHoverState(true);
  };

  const handleLeave = (e) => {
    setHoverState(false);
  };

  useEffect(() => {
    if (selected) {
      placeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [selected]);

  return (
    <Result
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      hoverd={hoverState}
      clicked={clickedState}
      selected={selected}
      ref={placeRef}
    >
      <div data-key={placeName} data-address={placeAddress}>
        이름 : {placeName}
      </div>
      <div>주소 : {placeAddress}</div>
    </Result>
  );
}
