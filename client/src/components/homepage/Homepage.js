import React from "react";
import { NavLink } from "react-router-dom";
import "./homepage.css";

const Homepage = ({ getLogInUser, setLogInUser }) => {
  return (
    <>
      {getLogInUser._id ? (
        <button className="button" onClick={() => setLogInUser({})}>
          Logout
        </button>
      ) : (
        <NavLink to="/login" className="button">
          Login
        </NavLink>
      )}
      <div className="homepage">
        <h1>Home page {getLogInUser.name && `Hello ${getLogInUser.name}`}</h1>
      </div>
    </>
  );
};

export default Homepage;
