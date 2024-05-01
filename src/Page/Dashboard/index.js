/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "../Component/card";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Checkbox, Drawer, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import JobOpeningConfigAPI from "../../Service/jobopening";
import { useSelector } from "react-redux";
import PagePagination from "../Component/pagination";
import { department, experience, location } from "./const";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Dashboard() {
  const [searchName, setSearchName] = useState("");
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectSpecialization, setSelectSpecialization] = React.useState([]);
  const [filter, setFilter] = useState({ is_remote: false });

  const [openingList, setOpeningList] = useState([]);

  async function getOpeningBasedOnEmp() {
    await JobOpeningConfigAPI.getOpenings({
      title: searchName,
      ...filter,
      skip: limit * (page - 1),
      limit: limit,
    }).then((res) => {
      setOpeningList(res.data.data.data);
      setTotalPageCount(res.data.data.count);
    });
  }

  useEffect(() => {
    getOpeningBasedOnEmp();
  }, [searchName, limit, page, filter]);

  return (
    <React.Fragment>
      <div className="flex justify-between pb-5">
      <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            size="small"
            placeholder="Filter"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="flex flex-row w-3/4 gap-5">
            <FormControl className="w-full">
              <InputLabel size="small">Department</InputLabel>
              <Select
                id="department"
                size="small"
                label="Department"
                value={filter?.department ? filter.department : ""}
                onChange={(e) => {
                  setSelectSpecialization(
                    department.find(
                      (data) => data.department === e.target.value
                    )?.specialization
                  );
                  let temp = { ...filter };
                  temp["department"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {department.map((data) => {
                  return (
                    <MenuItem value={data.department}>
                      {data.department}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className="w-full">
              <InputLabel size="small">Specialization</InputLabel>
              <Select
                id="Specialization"
                size="small"
                label="Specialization"
                value={filter?.specialization ? filter.specialization : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["specialization"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {selectSpecialization.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="small" className="">
                Location
              </InputLabel>

              <Select
                id="Location"
                size="small"
                label="Location"
                placeholder="Location"
                value={filter?.location ? filter.location : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["location"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {location.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="small">Experience</InputLabel>

              <Select
                id="Experience"
                size="small"
                label="Experience"
                value={filter?.experience ? filter.experience : ""}
                onChange={(e) => {
                  let temp = { ...filter };
                  temp["experience"] = e.target.value;
                  setFilter(temp);
                }}
              >
                {experience.map((items) => {
                  return <MenuItem value={items}>{items}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControlLabel
            label="Is Remote"
            control={
              <Checkbox
                checked={filter.is_remote}
                onChange={(_, e) => {
                    let temp = { ...filter };
                    temp["is_remote"] = e;
                    setFilter(temp);
                }}
              />
            }
          />
            
            <div
              onClick={() => {
                setFilter({});
              }}
            >
              <RestartAltIcon />
            </div>
          </div>
      </div>
      <Card data={openingList} />
      {openingList.length > 0 ? (
        <PagePagination
          totalPageCount={totalPageCount}
          setLimit={setLimit}
          limit={limit}
          setPage={setPage}
          page={page}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Dashboard;
