import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Taskform from "./pages/Taskform";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./utils/auth";
const App = () => {
  const isAuthenticated = !!getToken();
  console.log("isAuthenticated", isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/task"
          element={isAuthenticated ? <Taskform /> : <Navigate to="/login" />}
        />
      </Routes>
      {/* <Route
        path="/tasks/:id"
        element={isAuthenticated ? <Taskform /> : <Navigate to="/login" />}
      /> */}
    </Router>
  );
};

export default App;
