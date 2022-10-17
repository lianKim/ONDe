import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Account from './Accout';

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  height: 60px;
  background: tomato;
  color: white;
`;

function Header() {
  return (
    <HeaderBox>
      <Logo />
      <SearchBar />
      <Account />
    </HeaderBox>
  );
}

export default Header;
