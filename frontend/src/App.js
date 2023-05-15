import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SuccessVerification from "./pages/SuccessVerification";
import Login from "./pages/Login";
import HomeFront from "./pages/HomeFront";
import ResendEmail from "./pages/ResendEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import Post from "./pages/Post";
import UserPost from "./pages/UserPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Register} path="/register" />
        <Route Component={SuccessVerification} path="/verification-success" />
        <Route Component={Login} path="/login" />
        <Route Component={ResendEmail} path="/resend-email" />
        <Route Component={ForgotPassword} path="/forgot-password" />
        <Route Component={ResetPassword} path="/reset-password" />
        <Route Component={Home} path="/home" />
        <Route Component={ProfilePage} path="/profile" />
        <Route Component={Post} path="/post/:id" />
        <Route Component={UserPost} path="/user/:id" />
        <Route Component={HomeFront} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
