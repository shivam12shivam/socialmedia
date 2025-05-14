import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./scenes/LogIn";
import SignUp from "./scenes/SignUp";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import Navbar from "./scenes/Navbar";


function App() {
  const [count, setCount] = useState(0);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={isAuth ? <HomePage/> : <SignUp />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
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
