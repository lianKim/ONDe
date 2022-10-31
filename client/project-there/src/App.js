import { React, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import RequireAuth from './components/common/RequireAuth';
import GlobalStyle from './styles/global';

const TestPage = lazy(() => import('./pages/TestPage'));
const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const JourneyDetailPage = lazy(() => import('./pages/JourneyDetailPage'));
const JourneyUpdatePage = lazy(() => import('./pages/JourneyUpdatePage'));
const JourneyUploadPage = lazy(() => import('./pages/JourneyUploadPage'));
const PlaceUploadPage = lazy(() => import('./pages/PlaceUploadPage'));
const PlaceUpdatePage = lazy(() => import('./pages/PlaceUpdatePage'));
// const PlaceDetailPage = lazy(() => import('./pages/PlaceDetailPage'));
const MyJourneyPage = lazy(() => import('./pages/MyJourneyPage'));
const WishListPage = lazy(() => import('./pages/WishListPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
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
          <Route
            path="/journey/upload"
            element={
              <RequireAuth>
                <JourneyUploadPage />
              </RequireAuth>
            }
          />
          <Route
            path="/journey/update/:journeyId"
            element={
              <RequireAuth>
                <JourneyUpdatePage />
              </RequireAuth>
            }
          />
          <Route
            path="/placeupload/:journeyId"
            element={
              <RequireAuth>
                <PlaceUploadPage />
              </RequireAuth>
            }
          />
          <Route
            path="/placeupdate/:placeId"
            element={
              <RequireAuth>
                <PlaceUpdatePage />
              </RequireAuth>
            }
          />

          <Route path="/myjourney/:memberId" element={<MyJourneyPage />} />
          <Route path="/bookmark/:memberId" element={<WishListPage />} />

          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
