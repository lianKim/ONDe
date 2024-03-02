import { React, Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Reset } from 'styled-reset';
import RequireAuth from './components/common/RequireAuth';
import NotFound from './components/notFound/NotFound';
import Oauth2Redirect from './components/signIn/Oauth2Redirect';
import { useAuthActions } from './contexts/AuthContext';
import { getAccessToken } from './lib/utills/controlAccessToken';
import GlobalStyle from './styles/global';

const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const JourneyDetailPage = lazy(() => import('./pages/JourneyDetailPage'));
const JourneyUpdatePage = lazy(() => import('./pages/JourneyUpdatePage'));
const JourneyUploadPage = lazy(() => import('./pages/JourneyUploadPage'));
const PlaceUploadPage = lazy(() => import('./pages/PlaceUploadPage'));
const PlaceUpdatePage = lazy(() => import('./pages/PlaceUpdatePage'));
const MyJourneyPage = lazy(() => import('./pages/MyJourneyPage'));
const OtherUsersJourneysPage = lazy(() =>
  import('./pages/OtherUsersJourneysPage'),
);
const BookmarkedJourneyPage = lazy(() =>
  import('./pages/BookmarkedJourneyPage'),
);
const SignInPage = lazy(() => import('./pages/SignInPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const ProfileEditPage = lazy(() => import('./pages/ProfileEditPage'));

function App() {
  // 페이지 단위 회원 인증
  const { key } = useLocation();
  const { authenticateUser } = useAuthActions();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) authenticateUser(accessToken);
  }, [key]);

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
          <Route
            path="/myjourney/:memberId"
            element={
              <RequireAuth>
                <MyJourneyPage />
              </RequireAuth>
            }
          />
          <Route
            path="/bookmark/:memberId"
            element={
              <RequireAuth>
                <BookmarkedJourneyPage />
              </RequireAuth>
            }
          />
          <Route
            path="/journeys/:nickName"
            element={<OtherUsersJourneysPage />}
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/oauth2/redirect" element={<Oauth2Redirect />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/profile/:memberId"
            element={
              <RequireAuth>
                <ProfileEditPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
