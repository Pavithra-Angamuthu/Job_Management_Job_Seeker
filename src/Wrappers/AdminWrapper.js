import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";
import ViewApplication from "../Page/ViewJob";


function AdminWrapper() {

  return (
    <Layout>
      <Routes>
      <Route path="" element={<Dashboard />} />
      <Route exact path="/job/:id" element={<ViewApplication />} />
      </Routes>
    </Layout>
  );
}

export default AdminWrapper;
