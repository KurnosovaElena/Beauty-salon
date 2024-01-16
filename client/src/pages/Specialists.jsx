import React, { useEffect, useState } from 'react'
import { Menu } from "../components/Menu/Menu";
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./specialists.css";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { MasterCard } from '../components/MasterCard';

export function Specialists(props) {

  const dispatch = useDispatch();
  const[masters, setMasters] = useState([])

    useEffect(() => {
        getData();
      }, []);
    
      const navigate = useNavigate();
      const getData = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.get(
            "http://localhost:3001/get-all-approved-masters",
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          dispatch(hideLoading())
          if(response.data.success){
            setMasters(response.data.data)
          }
        } catch (error) {
          dispatch(hideLoading())
        }
      };
    
    return (
        <>
            <Menu>
              <div className="sp">
              <h1>Специалисты</h1>
              <div className="masters-dela">
              {masters.map((master) => (
  <MasterCard key={master._id} master={master} />
))}
              </div>
              
              </div>
            </Menu>
            <Footer></Footer>       
        </>
    )
}
