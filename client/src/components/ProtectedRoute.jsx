import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

export function ProtectedRoute(props) {
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async() => {
    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:3001/get-user-info-by-id', {token: localStorage.getItem('token')}, { //было 'http://localhost:3001/user/get-user-info-by-id'
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading())
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
      else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
      navigate("/login")
    }
  }

  useEffect(() => {

    if(!user) {
      getUser();
    }

  }, [user]) 

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
