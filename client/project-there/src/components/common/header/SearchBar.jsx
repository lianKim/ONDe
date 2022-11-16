import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useJourneyListActions } from '../../../contexts/JourneyListContext';

const SearchForm = styled.form`
  position: relative;
  display: inline-block;
  width: 500px;
  height: 40px;

  & input {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    border: 0;
    border-radius: 20px;
    color: var(--color-green200);
    font-size: var(--font-small);
    padding-left: 24px;
  }

  & button {
    position: absolute;
    right: -2px;
    height: 100%;
    background: var(--color-green300);
    border: 0;
    border-radius: 20px;
    color: var(--color-green100);
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { updateSearchOptions, initSearchOptions } = useJourneyListActions();
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef();

  const handleInputChange = ({ target }) => {
    setKeyword(target.value);
  };

  const handleShowBtn = () => {
    setVisible(true);
  };

  const handleHideBtn = () => {
    setVisible(false);
  };

  const handleKeywordSearch = async (e) => {
    e.preventDefault();
    inputRef.current.blur();
    handleHideBtn();

    initSearchOptions();
    await updateSearchOptions('keyword', keyword);
    setKeyword('');

    if (location.pathname !== '/') navigate('/');
  };

  return (
    <SearchForm onSubmit={handleKeywordSearch}>
      <input
        type="search"
        ref={inputRef}
        onFocus={handleShowBtn}
        onChange={handleInputChange}
        value={keyword}
        placeholder="원하는 여정을 찾아보세요!"
        required
      />
      {visible && <button type="submit">검색</button>}
    </SearchForm>
  );
}

export default SearchBar;
