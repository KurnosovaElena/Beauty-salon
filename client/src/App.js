import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp";
import { useSelector } from "react-redux";
import React from "react";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

export default function App(props) {
  
  const {loading} = useSelector(state => state.alerts)

  return (
    <BrowserRouter>
      {loading && (<div className="spinner-parent">
        <div className="spinner-border" role="status"></div>
      </div>)}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
