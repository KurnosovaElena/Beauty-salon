import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";

export function SignUp(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async() => {
    await axios.get("http://localhost:3001/register").then(async(res) => {
      console.log(res.data);
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#590B11",
      },
    },
  });

  const handleSubmit = (event) => {
    dispatch(showLoading())
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email,  password })
      .then(() => {
        dispatch(hideLoading());
        toast.success(response.data.message, {className:'toast-notification'})
        setEmail("");
        setUsername("");
        setPassword("");
        fetchUsers();
        navigate("/login");
      })//если нет, то засунь сюда
      .catch((error) => {
        dispatch(hideLoading());
        toast.error("Error registration",{className:'toast-notification'})
        console.log("Unable to register user");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="authentication">
        <div className="authentication-form card">
          <h1 className="card-title">SIGN UP</h1>
          <form
            className="box"
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{
              autoComplete: "off",
              marginTop: "0.7em",
              width: "fit-content"
            }}
          >
            <span className="normal-text">Name</span>
            <div>
              <TextField
                className="name"
                label="Name"
                variant="filled"
                sx={{ width: "100%", mb: "0.7em" }}
                size="small"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span className="normal-text">Email</span>
            <div>
              <TextField
                id="filled-basic1"
                label="Email"
                variant="filled"
                sx={{ width: "100%", mb: "0.7em" }}
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="normal-text">Password</span>
            <div>
              <TextField
                id="filled-basic"
                label="Password"
                type="password"
                variant="filled"
                sx={{ width: "100%", mb: "0.7em" }}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="primary-button"
              variant="contained"
              sx={{ width: "100%" }}
              type="submit"
            >
              SIGN UP
            </Button>
          </form>
          <div className="link">
            <Link href="/login" type="submit" underline="hover">
              {"Click here to SIGN IN"}
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
