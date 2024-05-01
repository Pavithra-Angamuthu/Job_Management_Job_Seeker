import React, { useEffect } from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard";
import Layout from "../Page/Layout";
import ViewApplication from "../Page/ViewJob";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";


function AdminWrapper() {
const navigate = useNavigate()
  const {details} = useSelector(state => state.auth)

  useEffect(()=>{
    if(!details.token){
      navigate("/login")
    }else{
      navigate("/")
    }
  },[details])

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
