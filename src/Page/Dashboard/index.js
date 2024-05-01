import React, { useEffect, useState } from "react";
import Card from "../Component/card";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Drawer, TextField } from "@mui/material";
import JobOpeningConfigAPI from "../../Service/jobopening";
import { useSelector } from "react-redux";

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  const [openingList, setOpeningList] = useState([]);
 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  async function getOpeningBasedOnEmp(){
    await JobOpeningConfigAPI.getOpenings({}).then(res=>{
        console.log(res)
        setOpeningList(res.data.data)
    })
  }

  useEffect(()=>{
    getOpeningBasedOnEmp()
  },[]);

  return (
    <React.Fragment>
      <div className="flex justify-between pb-5">
        <TextField
          id="input-with-icon-textfield"
          variant="outlined"
          size="small"
          placeholder="Filter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      
      </div>
      <Card  data={openingList}/>
    </React.Fragment>
  );
}

export default Dashboard;
