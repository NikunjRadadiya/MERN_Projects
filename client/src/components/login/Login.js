import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = ({ getLogInUser, setLogInUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginClick = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/login", user);
    alert(res.data.message);
    if (res.data.user) {
      navigate("/");
      setLogInUser(res.data.user);
    }
  };

  return (
    <div className="login">
      <h1>{getLogInUser.name && `Hello ${getLogInUser.name}`}</h1>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your Email"
        name="email"
        value={user.email || ""}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        value={user.password || ""}
        onChange={handleChange}
      />
      <button to="/login" className="button" onClick={loginClick}>
        Login
      </button>
      <div>or</div>
      <NavLink to="/register" className="button">
        Register
      </NavLink>
    </div>
  );
};

export default Login;
