import { React, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import JourneyUpdatePage from './pages/JourneyUpdatePage';
import GlobalStyle from './styles/global';

const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const JourneyDetailPage = lazy(() => import('./pages/JourneyDetailPage'));
const JourneyUploadPage = lazy(() => import('./pages/JourneyUploadPage'));
const PlaceUploadPage = lazy(() => import('./pages/PlaceUploadPage'));
const PlaceUpdatePage = lazy(() => import('./pages/PlaceUpdatePage'));
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
          <Route path="/" element={<MainPage />} />
          <Route path="/journey/:journeyId" element={<JourneyDetailPage />} />
          <Route path="/journey/upload" element={<JourneyUploadPage />} />
          {/* <Route path="/journey/update/:journeyId" element={} /> */}
          <Route
            path="/journey/update/:journeyId"
            element={<JourneyUpdatePage />}
          />
          <Route path="/placeupload/:journeyId" element={<PlaceUploadPage />} />
          <Route path="/placeupdate/:journeyId" element={<PlaceUpdatePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
