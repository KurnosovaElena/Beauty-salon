import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Menu } from "../components/Menu/Menu";
import moment from 'moment'
import { Link } from 'react-router-dom';
import "./specialists.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";

export function MasterAppointments(props) {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
  
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:3001/get-appointments-by-master-id",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    const changeAppointmentStatus = async (record, status) => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "http://localhost:3001/change-appointment-status", {appointmentId: record._id, status : status}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message, {className:'toast-notification'})
          getAppointmentsData()
        }
      } catch (error) {
          toast.error('Error changing status', {className:'toast-notification'})
        dispatch(hideLoading());
      }
    };

    useEffect(() => {
      getAppointmentsData();
    }, []);
  
    const columns = [
      {
        title: "id",
        dataIndex: "_id",
      },
      {
        title: "Client",
        dataIndex: "name",
        render: (text, record) => (
          <Link style={{pointerEvents: "none", cursor:"default", textDecoration:"none", color:"inherit"
          }} to={`/users/${record.userId._id}`}>
            <h1 className="card-text-app">
              {`${record.userInfo.name}`}
            </h1>
          </Link>
        ),
      },
      {
        title: "Number",
        dataIndex: "masterId",
        render: (text, record) => (
          <h1 className="card-text-app">
            {`${record.masterId.phoneNumber}`}
          </h1>
        ),
      },
      {
        title: "Date & Time",
        dataIndex: "createdAt",
        render: (text, record) => (
          <h1 className="card-text-app">
            {moment(record.date).format("MM/DD/YYYY")} {moment(record.time).format("hh:mm")}
          </h1>
        ),
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
            <div className="d-flex flex-row ">
              <h1 className="action-button me-2" onClick={() => changeAppointmentStatus(record, 'approved')}>Approve</h1>
              <h1 className="action-button" onClick={() => changeAppointmentStatus(record, 'rejected')}>Reject</h1>
            </div>
            )}
          </div>
        ),
      },
    ];

  
    return (
      <>
        <Menu>
          <div className="users-list-main-div">
            <h1 className="page-header">Лист записей</h1>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.title}
                          style={{ color: "#590B11", fontSize: "18px" }}
                        >
                          {column.title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((record) => (
                      <TableRow key={record._id}>
                        {columns.map((column, colIndex) => (
                          <TableCell  style={{fontSize:"16px"}} key={colIndex}>
                            {column.render ? column.render(column.dataIndex, record) : record[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
        </Menu>
      </>
    );
}