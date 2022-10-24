import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/header/Header';

const Wrapper = styled.div`
  width: 100vw;

  & > header {
    z-index: 9999;
  }
`;

function LayoutPage() {
  return (
    <Wrapper>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </Wrapper>
  );
}

export default LayoutPage;
