import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Register} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
