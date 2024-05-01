/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Drawer,
  Typography,
} from "@mui/material";
import JobOpeningConfigAPI from "../../Service/jobopening";
import Apply from "../Component/apply";
import { useSelector } from "react-redux";

function ViewApplication() {
  const [application, setApplication] = useState({});
  const id = window.location.pathname.split("/")[2];
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { details } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function getOpeningBasedOnid() {
    await JobOpeningConfigAPI.getOpeningsBasedonId({ id: id }).then((res) => {
      setApplication(res.data.data[0]);
    });
  }

  useEffect(() => {
    getOpeningBasedOnid();
  }, [id, open]);

  return (
    <React.Fragment>
      <div className="text-left ">
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <Typography gutterBottom variant="h6" component="div">
                {application.job_title}
              </Typography>

              <Button
                size="small"
                className="text-right"
                onClick={() => {
                  handleDrawerOpen();
                }}
                disabled={
                  application?.result?.filter(
                    (seeker) => seeker.job_seeker_id === details._id
                  )?.length > 0
                }
                variant="contained"
              >
                {application?.result?.filter(
                  (seeker) => seeker.job_seeker_id === details._id
                )?.length > 0
                  ? "Applied"
                  : "Apply"}
              </Button>
            </div>

            <div>
              <Chip label={application.department} style={{ margin: "5px" }} />
              <Chip
                label={application.specialization}
                style={{ margin: "5px" }}
              />
              <Chip label={application.location} style={{ margin: "5px" }} />
              {application.is_remote ? (
                <Chip label={"Remote"} style={{ margin: "5px" }} />
              ) : null}

              <Chip
                label={application.experience}
                style={{ margin: "5px" }}
                experience
              />
              {
                application?.keywords?.map(data=>{
                    return <Chip
                    label={data}
                    style={{ margin: "5px" }}
                  />
                })
              }
            </div>
            <div className="h-0.5 bg-slate-300 my-5"></div>

            <Typography variant="body2" color="text.secondary">
              {application.job_description}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Drawer
          sx={{
            width:
              windowWidth === 320
                ? 320
                : windowWidth < 320
                ? windowWidth
                : windowWidth < 700
                ? 300
                : windowWidth < 1000
                ? 400
                : 500,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width:
                windowWidth === 320
                  ? 320
                  : windowWidth < 320
                  ? windowWidth
                  : windowWidth < 700
                  ? 300
                  : windowWidth < 1000
                  ? 400
                  : 500,
            },
          }}
          anchor={"right"}
          open={open}
          onClose={() => {
            handleDrawerClose();
          }}
        >
          <div className="p-5">
            <Apply title="Add" close={handleDrawerClose} item={application} />
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  );
}

export default ViewApplication;
