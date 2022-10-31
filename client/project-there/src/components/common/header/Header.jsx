import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Account from './Accout';
import { useAuthValue } from '../../../contexts/auth';

const HeaderBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  height: 60px;
  background: var(--color-green100);
  color: white;
  width: 100%;
  z-index: 9999;
`;

function Header() {
  const { id } = useAuthValue();

  return (
    <HeaderBox>
      <Link to="/">
        <Logo />
      </Link>
      <SearchBar />
      <Account />
    </HeaderBox>
  );
}

export default Header;
