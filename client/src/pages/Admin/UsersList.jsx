import React, { useEffect, useState } from 'react'
import "./admin.css";
import { useDispatch } from "react-redux"
import {showLoading, hideLoading} from "../../redux/alertsSlice"
import axios from 'axios';
import { Menu } from "../../components/Menu/Menu";
import {OrButton} from "../../components/OrButton"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export function UsersList(props) {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()

    const getUsersData = async() => {

        try {
            dispatch(showLoading())
            const response = await axios.get("http://localhost:3001/get-all-users" , {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(response.data.success){
                setUsers(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())

        }

    }

    const exportPDF = () => {
        const doc = new jsPDF();
    
        const tableColumn = ["Name", "Email", "Created At"];
        const tableRows = [];
    
        users.forEach(user => {
            const userData = [
                user.name,
                user.email,
                user.createdAt,
            ];
            tableRows.push(userData);
        });
    
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Список пользователей", 14, 15);
        doc.save("users-list.pdf");
    };
    
    useEffect(() => {
        getUsersData()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt'
        },
    ]

    return (
        <>
            <Menu>
                <div className="users-list-main-div">
                    <h1 className='page-header-list'>Лист пользователей</h1>
                    <OrButton
                        color="#590B11" 
                        text="Экспорт в PDF"
                        width="200px" 
                        onClick={exportPDF} 
                    />
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{color: "#590B11", fontSize: "18px"}}>{column.title}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </Menu>
        </>
    )
}
