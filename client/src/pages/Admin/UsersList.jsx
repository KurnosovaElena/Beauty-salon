import React, { useEffect, useState } from 'react'
import "./admin.css";
import { useDispatch } from "react-redux"
import {showLoading, hideLoading} from "../../redux/alertsSlice"
import axios from 'axios';
import { Menu } from "../../components/Menu/Menu";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


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
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <h1 className=''>Block</h1>
                </div>
            )
        }
    ]

    return (
        <>
            <Menu>
                <div className="users-list-main-div">
                    <h1 className='page-header-list'>Лист пользователей</h1>
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
                                    <TableCell>
                                        <div className='d-flex'>
                                            <h1 className='action-button'>Block</h1>
                                        </div>
                                    </TableCell>
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
