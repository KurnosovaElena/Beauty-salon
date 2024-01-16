import React, { useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Footer } from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { OrButton } from "../components/OrButton";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./specialists.css";
import moment from "moment"
import toast from "react-hot-toast";

export function BookAppointment(props) {
  const [isAvailable, setIsAvailable] = useState(false);
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [master, setMaster] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const getMastersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3001/get-master-info-by-id",
        {
          masterId: params.masterId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setMaster(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const bookNow = async() => {
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:3001/book-appointment",
          {
            masterId: params.masterId,
            userId: user._id,
            masterInfo: master,
            userInfo: user,
            date: document.querySelector('input[name="date"]').value,
            time: document.querySelector('input[name="timings"]').value
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
            toast.success(response.data.message, {className:'toast-notification'})
        }
      } catch (error) {
        toast.error('Error booking appoinment', {className:'toast-notification'})
        dispatch(hideLoading());
      }
  }

  const checkAvailability = async() => {
    setIsAvailable(false)
    try {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:3001/check-booking-avilability",
          {
            masterId: params.masterId,
            date: document.querySelector('input[name="date"]').value,
            time: document.querySelector('input[name="timings"]').value
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
            toast.success(response.data.message, {className:'toast-notification'})
            setIsAvailable(true)
        }else{
          toast.error(response.data.message, {className:'toast-notification'})
        }
      } catch (error) {
        toast.error('Error booking appoinment', {className:'toast-notification'})
        dispatch(hideLoading());
      }
  }

  useEffect(() => {
    getMastersData();
  }, []);
  return (
    <>
      <Menu>
        {master && (
          <div className="appointment-booking-div">
            <h1 className="page-title">
              {master.firstName} {master.lastName}
            </h1>
            <hr />
            <div className="under-hr">
            <h1 className="normal-text">
              <b>TIMINGS : {master.timings}</b>
            </h1>
            <div className="pic-data">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div className="data"  style={{ width: "300px"}}>
                    <DatePicker name="date" onChange={(value) => {
                      if (value) {
                        setDate(moment(value).format("MM/DD/YYYY"));
                      }
                      setIsAvailable(false)
  }}  className="mb-1" label="Выберите дату" />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div
                  className="timing mb-1" style={{ display: "flex", flexDirection: "сolumn", width: "300px",}}>
                  
                  <TimePicker style={{width:"300px"}} format="hh:mm"  onChange={(value) => { setIsAvailable(false)
    if (value) {
      setTime(moment(value).format("hh:mm"));
    }
  }} label="From - To" name="timings" />
                </div>
              </LocalizationProvider>
              <OrButton
                color="rgba(89, 11, 17, 0.59)"
                text="проверить свободную запись"
                className="primary-button"
                width="300px"
                type="submit"
                onClick={checkAvailability}
              ></OrButton>

              {isAvailable && <OrButton
                color="rgba(89, 11, 17, 0.59)"
                text="записаться"
                className="primary-button"
                width="300px"
                type="submit"
                onClick={bookNow}
              ></OrButton>}
            </div>
            </div>
            
          </div>
        )}
      </Menu>
      <Footer></Footer>
    </>
  );
}
