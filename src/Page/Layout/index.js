import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom/dist";
import { useSelector } from "react-redux";

function Layout({children}) {
 const {details}   = useSelector((state) => state.auth);
  const navigator = useNavigate()

 console.log("--->>auth : ",details)

    return (
      <React.Fragment >
        <div className="h-screen bg-slate-50">
        <div className="flex flex-row w-screen bg-white px-10 py-4 text-black justify-between">
           <p className="text-2xl text-bold">Job Seeker Portal</p>
           {
            details.token?    <Avatar sx={{ width: 32, height: 32 }} src="/broken-image.jpg" />:
            <p onClick={()=>{
              navigator("/login")
            }}>Sign In</p>
           }
        
       </div>
       <div className="overflow-auto py-3 px-6">
       {children}
       </div>
        </div>
     
       
      </React.Fragment>
    );
  }
  
  export default Layout;
  