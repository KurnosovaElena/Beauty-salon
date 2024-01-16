import React, { useRef } from "react";
import "./applyMaster.css";
import { Menu } from "../../components/Menu/Menu";
import { Footer } from "../../components/Footer/Footer";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MasterForm } from "../../components/MasterForm";

export function ApplyMaster(props) {
    const dispatch = useDispatch();
    const {user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const handleSubmit = async() => {
      
    const formData = {
      firstName: document.querySelector('input[name="firstName"]').value,
      lastName: document.querySelector('input[name="lastName"]').value,
      phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
      website: document.querySelector('input[name="website"]').value,
      address: document.querySelector('input[name="address"]').value,
      specialization: document.querySelector('input[name="specialization"]')
        .value,
      experience: document.querySelector('input[name="experience"]').value,
      feePerProcedure: document.querySelector('input[name="feePerProcedure"]')
        .value,
      timings: document.querySelector('input[name="timings"]').value, // Подставьте правильное имя поля
    };

    console.log(formData)
    try {
        dispatch(showLoading());
        
        const response = await axios.post("http://localhost:3001/apply-master-account",  {...formData , userId : user._id} ,{ headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}});
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message,{className:'toast-notification'});
          navigate("/");
        } else {
          toast.error(response.data.message, {className:'toast-notification'});
        }
    } catch (error) {
        dispatch(hideLoading());
        toast.error("Something went wrong", {className:'toast-notification'});
    }

    document.querySelector('input[name="firstName"]').value = '';
    document.querySelector('input[name="lastName"]').value = '';
    document.querySelector('input[name="phoneNumber"]').value = '';
    document.querySelector('input[name="website"]').value = '';
    document.querySelector('input[name="address"]').value = '';
    document.querySelector('input[name="specialization"]').value = '';
    document.querySelector('input[name="experience"]').value = '';
    document.querySelector('input[name="feePerProcedure"]').value = '';
    document.querySelector('input[name="timings"]').value = '';
  };

  return (
    <>
      <Menu>
        <MasterForm handleSubmit={handleSubmit}></MasterForm>
      </Menu>
      <Footer></Footer>
    </>
  );
}
