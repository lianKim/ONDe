import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    right: 0;
    height: 100%;
    background: var(--color-green200);
    border-radius: 20px;
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const { updateSearchOptions, initSearchOptions } = useJourneyListActions();

  const inputRef = useRef();

  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleInputChange = ({ target }) => {
    setKeyword(target.value);
  };

  const handleShowBtn = () => {
    setVisible(true);
  };

  const handleHideBtn = () => {
    setVisible(false);
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    inputRef.current.blur();
    handleHideBtn();

    initSearchOptions();
    updateSearchOptions('keyword', keyword);
    setKeyword('');

    // navigate('/');
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
