import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Chip, Drawer, Snackbar } from "@mui/material";
import Apply from "./apply";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";

function CardDetails(props) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [selectedJob, setSelectJob] = useState({});
  const { details } = useSelector((state) => state.auth);
  const navigate = useNavigate("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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
    props.setOpen(true);
  };

  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  };

  return (
    <React.Fragment>
      <div className="flex grid grid-cols-3 gap-7 text-left">
        {props.data.map((item, i) => {
          return (
            <Card className="flex flex-col justify-between">
              <CardContent
                onClick={() => {
                  navigate(`/job/${item._id}`);
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {item.job_title}
                </Typography>
                <div>
                  <Chip label={item.department} style={{ margin: "5px" }} />
                  <Chip label={item.specialization} style={{ margin: "5px" }} />
                  <Chip label={item.location} style={{ margin: "5px" }} />
                  {item.is_remote ? (
                    <Chip label={"Remote"} style={{ margin: "5px" }} />
                  ) : null}

                  <Chip
                    label={item.experience}
                    style={{ margin: "5px" }}
                    experience
                  />
                  {item?.keywords?.map((data) => {
                    return <Chip label={data} style={{ margin: "5px" }} />;
                  })}
                </div>
                <div className="h-0.5 bg-slate-300 my-3"></div>
                <Typography variant="body2" color="text.secondary">
                  {truncate(item.job_description, 100, 100)}
                </Typography>
              </CardContent>
              <CardActions className="bottom-0">
                <Button
                  size="small"
                  className="w-full b-0 text-right"
                  onClick={() => {
                    if (details.token) {
                      setSelectJob(item);
                      handleDrawerOpen();
                    } else {
                      setSnackBarOpen(true);
                    }
                  }}
                  disabled={
                    item.result.filter(
                      (seeker) => seeker.job_seeker_id === details._id
                    ).length > 0
                  }
                  variant="contained"
                >
                  {item.result.filter(
                    (seeker) => seeker.job_seeker_id === details._id
                  ).length > 0
                    ? "Applied"
                    : "Apply"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>

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
        open={props.open}
        onClose={() => {
          handleDrawerClose();
        }}
      >
        <div className="p-5">
          <Apply title="Add" close={handleDrawerClose} item={selectedJob} />
        </div>
      </Drawer>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
        message="Please Sign-In to Apply"
      />
    </React.Fragment>
  );
}

export default CardDetails;
