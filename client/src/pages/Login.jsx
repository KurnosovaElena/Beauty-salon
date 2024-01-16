import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#590B11",
    },
  }, 
});

export function Login(props) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios.get("http://localhost:3001/register");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const email = event.target[0].value;
      const password = event.target[1].value;

      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      dispatch(hideLoading());
      const token = response.data.data;
      console.log(token);
      setEmail("");
      setPassword("");
      fetchUsers();
      toast.success(response.data.message, {className:'toast-notification'})
      navigate("/");
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error login", {className:'toast-notification'})
      console.log("Login Error", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="authentication">
        <div className="authentication-form card">
          <h1 className="card-title">SIGN IN</h1>
          <form
            className="box"
            onSubmit={handleLogin}
            autoComplete="off"
            style={{
              autoComplete: "off",
              marginTop: "0.7em",
              width: "fit-content",
            }}
          >
            <span className="normal-text">Email</span>
            <div>
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                sx={{ width: "100%", mb: "0.7em" }}
                size="small"
              />
            </div>
            <span className="normal-text">Password</span>
            <div>
              <TextField
                id="filled-basic1"
                label="Password"
                type="password"
                variant="filled"
                sx={{ width: "100%", mb: "0.7em" }}
                size="small"
              />
            </div>
            <Button
              className="primary-button"
              variant="contained"
              sx={{ width: "100%" }}
              type="submit"
            >
              SIGN IN
            </Button>
          </form>
          <div className="link">
            <Link href="/signup" type="submit" underline="hover">
              {"Click here to SIGN UP"}
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;
