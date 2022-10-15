import React from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
  position: relative;
  display: inline-block;
  width: 500px;
  height: 40px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  border: 1px solid black;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  background: lightsalmon;
  border: 1px solid black;
`;

function SearchBar() {
  return (
    <SearchForm>
      <SearchInput
        type="search"
        placeholder="원하는 여정을 찾아보세요!"
        required
      />
      <SearchButton type="submit">검색</SearchButton>
    </SearchForm>
  );
}

export default SearchBar;
