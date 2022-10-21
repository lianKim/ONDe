import { React, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import GlobalStyle from './styles/global';

const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const JourneyDetailPage = lazy(() => import('./pages/JourneyDetailPage'));
const JourneyUploadPage = lazy(() => import('./pages/JourneyUploadPage'));
const PlaceUploadPage = lazy(() => import('./pages/PlaceUploadPage'));
// const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
// const MyJourneyPage = lazy(() => import('./pages/MyJourneyPage'));
// const WishListPage = lazy(() => import('./pages/WishListPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage'));
// const SignUpPage = lazy(() => import('./pages/SignUpPage'));
// const EmailFindPage = lazy(() => import('./pages/EmailFindPage'));
// const PasswordResetPage = lazy(() => import('./pages/PasswordResetPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<MainPage />} />
          <Route path="/journeyupload" element={<JourneyUploadPage />} />
          <Route path="/journey" element={<JourneyDetailPage />} />
          <Route path="/placeupload" element={<PlaceUploadPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
