import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";

const Register = ({ setLogInUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { name, email, password, repassword } = user;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name && email && password && password === repassword) {
        const res = await axios.post("http://localhost:8000/register", user);
        if (res.data.user) {
          setLogInUser(res.data.user);
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      } else {
        alert("invalid input");
      }
    } catch (err) {
      if (err) throw err;
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={name || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Your Email"
          name="email"
          value={email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Re-enter password"
          name="repassword"
          value={repassword || ""}
          onChange={handleChange}
        />

        <button type="submit" className="button">
          Register
        </button>
      </form>
      <div>or</div>
      <NavLink to="/login" className="button">
        Login
      </NavLink>
    </div>
  );
};

export default Register;
