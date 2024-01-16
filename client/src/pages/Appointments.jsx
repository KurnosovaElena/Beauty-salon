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

export function Appointments(props) {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
  
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:3001/get-appointments-by-user-id",
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

    useEffect(() => {
      getAppointmentsData();
    }, []);
  
    const columns = [
      {
        title: "id",
        dataIndex: "_id",
      },
      {
        title: "Master",
        dataIndex: "masterId",
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
    ];

  
    return (
      <>
        <Menu>
          <div className="users-list-main-div">
            <h1 className="page-header" style={{overflowY:"hidden"}}>Лист записей</h1>
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
                          <TableCell style={{fontSize:"16px", overflowY:"hidden"}} key={colIndex}>
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