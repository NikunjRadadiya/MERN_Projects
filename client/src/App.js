import React, { useState } from "react";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/comp/Layout";
import Footer from "./components/comp/Footer";

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <>
      <Layout />
      <div className="App">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Homepage
                  getLogInUser={logInUser}
                  setLogInUser={setLogInUser}
                />
              }
            />
            <Route
              exact
              path="/register"
              element={<Register setLogInUser={setLogInUser} />}
            />
            <Route
              exact
              path="/login"
              element={
                <Login getLogInUser={logInUser} setLogInUser={setLogInUser} />
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
