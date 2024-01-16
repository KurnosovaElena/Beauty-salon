import React, { useEffect, useState } from "react";
import "./admin.css";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Menu } from "../../components/Menu/Menu";
import {toast} from 'react-hot-toast'
import { UsersListMainDiv } from "../../components/UsersListMainDiv";

export function MastersList(props) {
  const [masters, setMasters] = useState([]);
  const dispatch = useDispatch();

  const getMastersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:3001/get-all-masters",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setMasters(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeMasterStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:3001/change-master-status", {masterId: record._id, userId: record.userId, status : status}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, {className:'toast-notification'})
        getMastersData()
      }
    } catch (error) {
        toast.error('Error changing status', {className:'toast-notification'})
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getMastersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1 className="card-text">
          {record.firstName} {record.lastName}
        </h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1 className="action-button" onClick={() => changeMasterStatus(record, 'approved')}>Approve</h1>
          )}
          {record.status === "approved" && (
            <h1 className="action-button" onClick={() => changeMasterStatus(record, 'blocked')}>Block</h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Menu />
      <UsersListMainDiv columns={columns} masters={masters} />
    </>
  );
}
