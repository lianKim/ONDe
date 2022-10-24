import React from 'react';
import styled from 'styled-components';
import PlaceSearchResultElement from './PlaceSearchResultElement';

const ResultWrapper = styled.div`
  width : 40%;
  background-color : #ebecf0;
  display: flex;
  flex-direction: column;
`;
const PlaceSearchArea = styled.div`
  width: 100%;
  height: 15%;
  background-color: #bebebe;
  display: flex;
  align-items: center;
  position:relative;
`;
const SearchInput = styled.input`
  height: 30%;
  width: 80%;
  margin-left: 10px;
`;
const SearchButton = styled.button`
  background-color : #949494;
  height: 30%;
  width: 20%;
  margin-right: 10px;
  border: 1px solid black;
`;
const ResultList = styled.ol`
  list-style: none;
  width: 100%;
  height: 85%;
  background-color: #ebecf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y : scroll;
`;

export default function PlaceSearchResultList({ setPoint, setHover,
  setSelected, setPointAddress }) {
  const { pointPlaces, setPointPlaces } = setPoint;
  const { placeHover, setPlaceHover } = setHover;
  const { placeSelected, setPlaceSelected } = setSelected;

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
  };

  const handleSearchButtonClick = (e) => {
    e.stopPropagation();
    let target = e.target.closest('div');
    target = target.querySelector('input');
    if (target.value !== '') {
      setPointAddress([target.value]);
    }
  };

  return (
    <ResultWrapper>
      <PlaceSearchArea>
        <SearchInput placeholder="주소를 검색해주세요.." />
        <SearchButton
          onClick={handleSearchButtonClick}
        >
          검색

        </SearchButton>
      </PlaceSearchArea>
      <ResultList
        onMouseLeave={() => { setPlaceHover(''); }}
        onClick={handleClick}
      >
        {pointPlaces.length === 0 && ('검색 결과가 없습니다. 다시 검색해주세요')}
        {pointPlaces?.map((place) => {
          let selected = false;
          if (place[0] === placeSelected) {
            selected = true;
          }
          return (
            <PlaceSearchResultElement
              placeInfo={place}
              key={`${place[0]}-${place[1]}`}
              setHover={setHover}
              selected={selected}
            />
          );
        })}
      </ResultList>
    </ResultWrapper>
  );
}
