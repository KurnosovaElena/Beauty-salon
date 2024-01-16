import React from "react";
import "../pages/specialists.css";
import {
  TableCell,
  TableRow,
} from "@mui/material";

export function MasterRow({ master, columns }) {
        return (
          <TableRow key={master._id}>
            <TableCell>
              {master.firstName} {master.lastName}
            </TableCell>
            <TableCell>{master.phoneNumber}</TableCell>
            <TableCell>{master.createdAt}</TableCell>
            <TableCell>{master.status}</TableCell>
            <TableCell>
              {columns
                .filter((column) => column.title !== "Name") // Exclude "Name" column
                .map((column, colIndex) => (
                  <div key={colIndex}>
                    {column.render &&
                      column.render(master[column.dataIndex], master)}
                  </div>
                ))}
            </TableCell>
          </TableRow>
        );
}
