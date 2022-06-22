import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import NavBar from "./components/Navbar/navBar";
import CompraList from "./components/Compra/compraList";
import CompraForm from "./components/Compra/compraForm";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <div className="container my-4">
      <Routes>
        <Route exact path="/" element={<CompraList />} />
        <Route path="/compraForm" element={<CompraForm />} />
        <Route path="/updateCompra/:id" element={<CompraForm />} />
      </Routes>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
