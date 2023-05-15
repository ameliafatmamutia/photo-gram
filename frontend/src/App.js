import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SuccessVerification from "./pages/SuccessVerification";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResendEmail from "./pages/ResendEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Register} path="/register" />
        <Route Component={SuccessVerification} path="/verification-success" />
        <Route Component={Login} path="/login" />
        <Route Component={ResendEmail} path="/resend-email" />
        <Route Component={Home} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
