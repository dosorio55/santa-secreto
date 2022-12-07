// import logo from "./logo.svg";
import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const initialToken = JSON.parse(localStorage.getItem("token")) || '';

function App() {
  const [token, setToken] = useState(initialToken.token);

  return (
    <Routes>
      <Route path="/profile" element={<Profile token={token} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/*" element={<Register setToken={setToken} />} />
    </Routes>
  );
}

export default App;
