import React, { useState } from "react";
import "./notifications.css";
import { Menu } from "../../components/Menu/Menu";
import { Footer } from "../../components/Footer/Footer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
import { NotificationsMainDiv } from "../../components/NotificationsMainDiv";

const CustomTabs = styled(Tabs)({
  indicator: {
    backgroundColor: "#590B11",
    display: "none",
  },
  "& .MuiTabs-indicator": {
    color: "#590B11",
  },
});
const CustomTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#590B11",
  },
});

export function Notifications(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onсlickPath = "/admin/masters";
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://localhost:3001/mark-all-notifications-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, {className:'toast-notification'});
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message, {className:'toast-notification'});
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong", {className:'toast-notification'});
    }
  };

  const deleteAllSeen = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "http://localhost:3001/delete-all-notifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, {className:'toast-notification'});
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message, {className:'toast-notification'});
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong", {className:'toast-notification'});
    }
  };

  return (
    <>
      <Menu />
      <NotificationsMainDiv
        value={value}
        handleChange={handleChange}
        markAllAsSeen={markAllAsSeen}
        deleteAllSeen={deleteAllSeen}
        user={user}
      />
      <Footer />
    </>
  );
}
