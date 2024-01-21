import React from 'react'
import "./masterCard.css";
import { useNavigate } from 'react-router-dom';
export function MasterCard({master}) {

const navigate = useNavigate()

    return (
        <>
            <div className="card-box-none-bore" style={{overflow:"visible"}} onClick={() => navigate(`/book-appointment/${master._id}`)}>
                <h1 className="card-title-1">{master.firstName} {master.lastName}</h1>
                <hr />
                <p><b>Specialization : </b>{master.specialization}</p>
                <p><b>Phone Number : </b>{master.phoneNumber}</p>
                <p><b>Address : </b>{master.address}</p>
                <p><b>Fee Per Procedure : </b>{master.feePerProcedure}</p>
                <p><b>Timings : </b>{master.timings}</p>
            </div>
        </>
    )
}
