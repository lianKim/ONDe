import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/common/header/Header';
import JourneyListProvider from '../contexts/JourneyListContext';

const Wrapper = styled.div`
  width: 100vw;

  & > header {
    z-index: 9999;
  }
`;

function LayoutPage() {
  return (
    <JourneyListProvider>
      <Wrapper>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </Wrapper>
    </JourneyListProvider>
  );
}

export default LayoutPage;
