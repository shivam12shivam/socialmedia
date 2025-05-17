import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./scenes/LogIn";
import SignUp from "./scenes/SignUp";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import { setLogout,setLogin } from "./redux/userSlice";
import axios from "axios";

function App() {
  const isAuth = (useSelector((state) => state.auth.isAuthenticated));
  console.log(isAuth);
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/check-auth",
          {
            withCredentials: true,
          }
        );
        console.log("res data",response.data.user);
        console.log("res data",response.data.token);

        if (response.data) {
          console.log("setting dispatch");
          dispatch(
            setLogin({
              user: response.data.user,
              isAuthenticated:true,
              token: response.data.token, // Adjust based on your API response
            })
          );
          console.log("is Auth status: ", isAuth);
        }
      }
      catch (error) {
        // Clear any invalid token
        
      }
    };
    if (!isAuth) {
      checkAuthStatus();
    }
  }, [dispatch, isAuth]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <LogIn />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          path="/home"
          element={isAuth?<HomePage />:<Navigate to="/signup" /> }
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
