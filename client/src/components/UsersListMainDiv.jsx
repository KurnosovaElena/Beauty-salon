import React from 'react'
import { MasterRow } from './MasterRow';
import "../pages/Admin/admin.css";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
} from "@mui/material";

export function UsersListMainDiv({ columns, masters }) {
 
        return (
          <div className="users-list-main-div">
            <h1 className="page-header">Лист мастеров</h1>
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
                  {masters.map((master) => (
                    <MasterRow master={master} columns={columns} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      
      
}
