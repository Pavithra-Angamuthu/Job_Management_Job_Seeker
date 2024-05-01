import React, { useState } from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import JobApplyConfigAPI from "../../Service/jobapply.js";

function Apply(props) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const { details } = useSelector((state) => state.auth);

  const initialState = {
    job_opening_id: props.item._id,
    job_seeker_id: details._id,
    name: "",
    qualification: "",
    passed_out_year: "",
    experience: "",
    email: details.email,
    phone_number: details.phone_number.toString(),
    resume: "",
  };

  const opeingDetails = { ...initialState };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    qualification: Yup.string().required("Qualification is required"),
    passed_out_year: Yup.string().required("Passed out year is required"),
    experience: Yup.string().required("Experience is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone_number: Yup.string()
      .required("Phone Number is required")
      .matches(/^[6-9]\d{9}$/, "Invalid Phone number"),
    resume: Yup.string()
      .required("Resume is required")
      .min(100, "Resume must be at least 100 characters")
      .max(2000, "Resume cannot exceed 2000 characters"),
  });

  const formik = useFormik({
    initialValues: {
      ...opeingDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let payload = {
          ...values,
        };
        const response = await JobApplyConfigAPI.createApply(values);
      
        if (response.data.status) {
          props.close();
        } else {
          setSnackBarOpen(true);
          setError(response.data.message);
        }
      } catch (err) {
        console.log(err);
        setSnackBarOpen(true);
        setError(err.message);
      }
    },
  });

  return (
    <React.Fragment>
      <div className="font-bold">Apply</div>
      <div className=" grid grid-cols-2 py-4 flex-wrap gap-6 ">
        <div className="flex flex-col justify-start">
          <p>Name</p>
          <TextField
            id="name"
            placeholder="Enter the Name"
            variant="outlined"
            size="small"
            value={formik?.values?.name}
            onChange={(e) => {
              formik.setFieldValue("name", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.name?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <p>Qualification</p>
          <TextField
            id="Qualification"
            placeholder="Enter the Qualification"
            variant="outlined"
            size="small"
            value={formik?.values?.qualification}
            onChange={(e) => {
              formik.setFieldValue("qualification", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.qualification && formik.errors.qualification && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.qualification?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Passes Out Year</p>
          <TextField
            id="passed_out_year"
            placeholder="Enter the Passed Out Year"
            variant="outlined"
            size="small"
            value={formik?.values?.passed_out_year}
            onChange={(e) => {
              formik.setFieldValue("passed_out_year", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.passed_out_year && formik.errors.passed_out_year && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.passed_out_year?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>experience</p>
          <TextField
            id="experience"
            placeholder="Enter the Experience"
            variant="outlined"
            size="small"
            value={formik?.values?.experience}
            onChange={(e) => {
              formik.setFieldValue("experience", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.experience && formik.errors.experience && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.experience?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Email</p>
          <TextField
            id="email"
            placeholder="Enter the Email"
            variant="outlined"
            size="small"
            value={formik?.values?.email}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.email?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Phone Number</p>
          <TextField
            id="Phone_Number"
            placeholder="Enter the Phone Number"
            variant="outlined"
            size="small"
            value={formik?.values?.phone_number}
            onChange={(e) => {
              formik.setFieldValue("phone_number", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.phone_number && formik.errors.phone_number && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.phone_number?.toString()}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <p>Resume</p>
          <TextField
            id="Resume"
            multiline
            rows={4}
            className="w-full"
            placeholder="Enter the Resume"
            variant="outlined"
            size="small"
            value={formik?.values?.resume}
            onChange={(e) => {
              formik.setFieldValue("resume", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />

          {formik.touched.resume && formik.errors.resume && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.resume?.toString()}
            </p>
          )}
        </div>
      </div>
      <div class="flex gap-5 justify-end">
        <Button
          variant="contained"
          className="b-0 "
          onClick={() => {
            formik?.handleSubmit();
          }}
        >
          Apply
        </Button>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
        message={error}
      />
    </React.Fragment>
  );
}

export default Apply;
