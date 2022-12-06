// import logo from "./logo.svg";
import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const initialToken = JSON.parse(localStorage.getItem('token'))

function App() {
  const [token, setToken] = useState(initialToken.token);

  return (
    <div className="flex justify-center align-middle w-screen min-h-screen">
      <Routes>
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/*" element={<Login setToken={setToken} token={token}/>} />
      </Routes>
    </div>
  );
}

export default App;
