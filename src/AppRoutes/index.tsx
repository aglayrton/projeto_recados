import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";

const ComponetName = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Login</h1>}/>
          <Route path="/signup" element={<h1>Cadastro</h1>}/>
          <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default ComponetName;
