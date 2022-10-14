import { React, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// const EmailFind = lazy(() => import('./pages/EmailFind'));
// const JourneyUpload = lazy(() => import('./pages/JourneyUpload'));
// const Login = lazy(() => import('./pages/Login'));
const Main = lazy(() => import('./pages/MainPage'));
// const MyJourney = lazy(() => import('./pages/MyJourney'));
// const PasswordReset = lazy(() => import('./pages/PasswordReset'));
// const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));
const Places = lazy(() => import('./pages/PlacesPage'));
const PlaceUpload = lazy(() => import('./pages/PlaceUploadPage'));
// const SignUp = lazy(() => import('./pages/SignUp'));
// const WishList = lazy(() => import('./pages/WishList'));

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
