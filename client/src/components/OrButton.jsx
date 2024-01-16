import React from 'react'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export function OrButton({ color, text, route, width, typeButton, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (route) {
            navigate(route);
            console.log(route)
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
        <Button variant="contained" style={{ backgroundColor: color, fontfamily: "Prata", width: width, marginBottom: "2%" }} onClick={handleClick}
            type={typeButton}>{text} </Button>
        </>
    )
}
