import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../config";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRoutes = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
