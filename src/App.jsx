// import logo from "./logo.svg";
import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex justify-center align-middle w-screen min-h-screen">
      <Routes>
       {/*  <Route>
          
        </Route> */}
        <Login />
      </Routes>
    </div>
  );
}

export default App;
