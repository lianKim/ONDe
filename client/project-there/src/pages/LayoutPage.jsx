import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/header/Header';

function LayoutPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutPage;
