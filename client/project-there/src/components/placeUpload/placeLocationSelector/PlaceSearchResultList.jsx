import React, { useState } from 'react';
import styled from 'styled-components';
import PlaceSearchResultElement from './PlaceSearchResultElement';

const ResultWrapper = styled.div`
  width: 40%;
  max-width: 40%;
  min-width: 30%;
  display: flex;
  flex-direction: column;
`;
const PlaceSearchArea = styled.form`
  width: 100%;
  height: 12%;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--color-green100);
`;

const SearchInput = styled.input`
  height: 40%;
  width: 90%;
  margin-left: 10px;
  border-radius: 20px;
  padding-left: 18px;
  border: 0;
  min-height: 30px;
  background: var(--color-gray100);
`;

const SearchButton = styled.button`
  background-color: var(--color-green300);
  font-weight: var(--weight-semi-bold);
  height: 40%;
  width: 54px;
  position: absolute;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  min-height: 30px;
  margin-top: -0.5px;
`;

const ResultList = styled.ol`
  list-style: none;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;
const NoResultWrapper = styled.div`
  margin-top: 10%;
`;

export default function PlaceSearchResultList({
  setPoint,
  setHover,
  setSelected,
  setPointAddress,
  setAddressSelected,
  setAddressHoverd,
}) {
  const { pointPlaces, setPointPlaces } = setPoint;
  const { placeHover, setPlaceHover } = setHover;
  const { placeAddressHover, setPlaceAddressHover } = setAddressHoverd;
  const [placeSelected, setPlaceSelected] = setSelected;
  const [placeSelectedAddress, setPlaceSeletedAddress] = setAddressSelected;
  const [searchOpen, setSearchOpen] = useState(false);

  const handleClick = (e) => {
    let { target } = e;
    if (target.tagName === 'OL') {
      return;
    }
    if (target.tagName === 'DIV') {
      target = target.closest('li');
    }
    target = target.querySelector('div');
    if (target.dataset.key !== placeSelected) {
      setPlaceSelected(target.dataset.key);
    }
    if (target.dataset.address !== placeSelectedAddress) {
      setPlaceSeletedAddress(target.dataset.address);
    }
  };

  const handlePlaceSearch = (e) => {
    e.preventDefault();
    const target = e.target.querySelector('input');
    if (target.value !== '') {
      setPointAddress([target.value]);
    }
    target.value = '';
  };

  const handleMouseLeaved = () => {
    setPlaceHover('');
    setPlaceAddressHover('');
  };

  return (
    <ResultWrapper>
      <PlaceSearchArea
        onSubmit={(e) => {
          handlePlaceSearch(e);
        }}
      >
        <SearchInput
          placeholder="주소를 검색해주세요!"
          onFocus={() => {
            setSearchOpen(true);
          }}
          onBlur={() => {
            setSearchOpen(false);
          }}
        />
        <SearchButton type="submit">검색</SearchButton>
      </PlaceSearchArea>
      <ResultList onMouseLeave={handleMouseLeaved} onClick={handleClick}>
        {pointPlaces.length === 0 && (
          <NoResultWrapper>
            검색 결과가 없습니다.
            <br />
            <br />
            다시 검색해주세요
          </NoResultWrapper>
        )}
        {pointPlaces?.map((place) => {
          let selected = false;
          if (place[0] === placeSelected && place[1] === placeSelectedAddress) {
            selected = true;
          }
          return (
            <PlaceSearchResultElement
              placeInfo={place}
              key={`${place[0]}-${place[1]}`}
              setHover={setHover}
              setAddressHover={setAddressHoverd}
              selected={selected}
            />
          );
        })}
      </ResultList>
    </ResultWrapper>
  );
}
