import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
import MobileSidebar from "./pages/home/MobileSidebar";
import MessageContainer from "./pages/home/MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/utilities/ProtectedRoutes";
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/userSlice/user.thunk";

const App = () => {
  const { user, loading, error, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch()
  // console.log("User state:", { user, loading, error, isAuthenticated });

  useEffect(()=>{
    (async()=>{
      await dispatch(getUserProfileThunk());
       await dispatch(getOtherUsersThunk())
    })()
  },[])

  return (
    <div>
      {/* Toaster for showing toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Optional debug for state */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <Routes>
        <Route path="/" element={
    <ProtectedRoutes>
      <Home/>
    </ProtectedRoutes>
  } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobile-sidebar"  element={
    <ProtectedRoutes>
      <MobileSidebar />
    </ProtectedRoutes>
  } />
        <Route path="/msg-container" element={<MessageContainer />} />
      </Routes>
    </div>
  );
};

export default App;
