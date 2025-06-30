import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2';
import Home from './pages/Home';
import { UserDataContext } from './context/userContext';

function App() {
  const { userData } = useContext(UserDataContext);

  const isAuthenticated = !!userData;
  const isProfileComplete = userData?.assistantImage && userData?.assistantName;

  return (
    <Routes>
      {/* Home route only accessible if profile is complete */}
      <Route
        path="/"
        element={(userData?.assistantImage && userData?.assistantName)?<Home />:<Navigate to ={"/customize"}/>}
      />

      {/* Auth routes */}
      <Route
        path="/signup"
        element={ !userData?<SignUp />:<Navigate to={"/"}/> }
      />
      <Route
        path="/signin"
        element={ !userData?<SignIn />:<Navigate to={"/"}/> }
      />
<Route
  path="/customize"
  element= {userData?<Customize />:<Navigate to={"/signup"}/>} // ✅ No auth check here
/>
<Route
  path="/customize2"
  element= {userData?<Customize2 />:<Navigate to={"/signup"}/>} // ✅ No auth check here
/>
    </Routes>
  );
}

export default App;
