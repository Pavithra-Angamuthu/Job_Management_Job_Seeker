import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Drawer } from "@mui/material";
import Apply from "./apply";
import { useSelector } from "react-redux";

function CardDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [selectedJob, setSelectJob] = useState({});
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

  return (
    <React.Fragment>
      <div className="flex grid grid-cols-3 gap-7">
        {props.data.map((item) => {
          return (
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.job_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.job_description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  className="w-full b-0 text-right"
                  onClick={() => {
                    setSelectJob(item);
                    handleDrawerOpen();
                  }}
                  disabled={!details.token}
                  variant="contained"
                >
                  Apply
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
        open={open}
        onClose={() => {
          handleDrawerClose();
        }}
      >
        <div className="p-5">
          <Apply title="Add" close={handleDrawerClose} item={selectedJob} />
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default CardDetails;
