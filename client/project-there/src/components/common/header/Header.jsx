import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Account from './Accout';

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

// 현재 경로
let currentPath = '';

function Header() {
  // 메인페이지에서 로고 클릭할 경우 새로고침 될 수 있도록
  const location = useLocation();
  useEffect(() => {
    if (currentPath === location.pathname) {
      window.location.reload();
    }
    currentPath = location.pathname;
  }, [location]);

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
