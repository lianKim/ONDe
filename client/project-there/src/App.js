import { React, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// const EmailFind = lazy(() => import('./pages/EmailFindPage'));
// const JourneyUpload = lazy(() => import('./pages/JourneyUploadPage'));
// const Login = lazy(() => import('./pages/LoginPage'));
const Main = lazy(() => import('./pages/MainPage'));
// const MyJourney = lazy(() => import('./pages/MyJourneyPage'));
// const PasswordReset = lazy(() => import('./pages/PasswordResetPage'));
// const PlaceDetail = lazy(() => import('./pages/PlaceDetailPage'));
const Places = lazy(() => import('./pages/PlacesPage'));
const PlaceUpload = lazy(() => import('./pages/PlaceUploadPage'));
// const SignUp = lazy(() => import('./pages/SignUpPage'));
// const WishList = lazy(() => import('./pages/WishListPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/places" element={<Places />} />
        <Route path="/placeupload" element={<PlaceUpload />} />
      </Routes>
    </Suspense>
  );
}

export default App;
