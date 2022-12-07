// import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { fetchData } from "./constants/settings";

const initialToken = JSON.parse(localStorage.getItem("token")) || "";

function App() {
  const [token, setToken] = useState(initialToken.token);
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const serverResponse = await fetchData(null, null, "GET", "users");
      if (serverResponse.status === 200) {
        const data = await serverResponse.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Routes>
      <Route path="/profile" element={<Profile token={token} />} />
      <Route
        path="/login"
        element={<Login setToken={setToken} users={users} />}
      />
      <Route
        path="/*"
        element={<Register setToken={setToken} users={users} />}
      />
    </Routes>
  );
}

export default App;
