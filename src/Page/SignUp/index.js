import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import JobSeekerConfigAPI from "../../Service/jobseeker";
import { useSelector } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const navigate = useNavigate();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const {details} = useSelector(state => state.auth)
  const [showPassword, setShowPassword] = React.useState(false);

  const initialState = {
    email: "",
    name: "",
    password: "",
    phone_number: "",
    confirm_password: "",
  };

  useEffect(()=>{
    if(!details.token){
      navigate("/signup")
    }else{
      navigate("/")
    }
  },[details])

  const SignUpDetails = { ...initialState };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email Address is required"),
    phone_number: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid Phone number")
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...SignUpDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let payload = {
        ...values,
        password: btoa(values?.password),
        confirm_password: btoa(values?.confirm_password),
      };
      const response = await JobSeekerConfigAPI.createJobSeeker(payload);
      if (response.data.status) {
        navigate("/login");
      } else {
        setSnackBarOpen(true);
        setError(response.data.message);
      }
    },
  });

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center ">
        {/* ^ Added 'h-screen' to make it full-screen and 'flex justify-center items-center' to center vertically and horizontally */}
        <div className="grid grid-cols-1 gap-4 border-y border-x rounded-md border-inherit px-8 py-5 w-4/12">
          <p className="text-2xl font-bold">Job Seeker Sign-Up</p>
          <div className=" grid px-8 py-4 flex-wrap gap-6 ">
            <div className=" flex flex-col justify-start ">
              <TextField
                id="Name"
                label=" Name"
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
              <TextField
                id="Email"
                label="Email"
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
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                size="small"
                value={formik?.values?.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                  {formik.errors.password?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                id="Confirm Password"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type={ "password"}
                value={formik?.values?.confirm_password}
                onChange={(e) => {
                  formik.setFieldValue("confirm_password", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
                    {formik.errors.confirm_password?.toString()}
                  </p>
                )}
            </div>
            <div className="flex flex-col justify-start">
              <TextField
                id="phone_number"
                label="Phone Number"
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
          </div>

          <div className="">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                formik?.handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
          <p className="text-sm">
            Already have an account. Click here{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign-In
            </span>
          </p>
        </div>
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

export default SignUp;
