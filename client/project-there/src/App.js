import { React, Suspense } from 'react';

const EmailFind = React.lazy(() => import('./pages/EmailFind'));
const JourneyUpload = React.lazy(() => import('./pages/JourneyUpload'));
const Login = React.lazy(() => import('./pages/Login'));
const Main = React.lazy(() => import('./pages/Main'));
const MyJourney = React.lazy(() => import('./pages/MyJourney'));
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'));
const PlaceDetail = React.lazy(() => import('./pages/PlaceDetail'));
const Places = React.lazy(() => import('./pages/Places'));
const PlaceUpload = React.lazy(() => import('./pages/PlaceUpload'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const WishList = React.lazy(() => import('./pages/WishList'));


function App() {
  return (
  );
}

export default App;
