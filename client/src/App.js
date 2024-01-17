import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp";
import { Specialists } from "./pages/Specialists";
import { ApplyMaster } from "./pages/Apply/ApplyMaster";
import { Notifications } from "./pages/Notifications/Notifications";
import { Toaster } from "react-hot-toast";
import {BookAppointment} from './pages/BookAppointment'
import React from "react";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { UsersList } from "./pages/Admin/UsersList";
import { MastersList } from "./pages/Admin/MastersList";
import { Appointments } from "./pages/Appointments";
import { MasterAppointments } from "./pages/MasterAppointments";

function App() {
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
        <Route path="/apply-master" element={<ProtectedRoute><ApplyMaster /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/masters" element={<ProtectedRoute><MastersList /></ProtectedRoute>} />
        <Route path="/specialists" element={<ProtectedRoute><Specialists /></ProtectedRoute>} />
        <Route path="/book-appointment/:masterId" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><MasterAppointments /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
