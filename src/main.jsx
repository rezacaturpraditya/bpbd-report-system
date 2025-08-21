import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Reports from "./Reports";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <nav className="p-4 bg-blue-600 text-white flex gap-4">
      <Link to="/">Form</Link>
      <Link to="/reports">Daftar Laporan</Link>
    </nav>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  </BrowserRouter>
);
