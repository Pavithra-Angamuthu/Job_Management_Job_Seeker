import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";


function AdminWrapper() {

  return (
    <Layout>
      <Routes>
      <Route path="" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default AdminWrapper;
