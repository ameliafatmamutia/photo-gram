import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SuccessVerification from "./pages/SuccessVerification";
import Login from "./pages/Login";
import HomeFront from "./pages/HomeFront";
import ResendEmail from "./pages/ResendEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
        <Route Component={HomeFront} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
