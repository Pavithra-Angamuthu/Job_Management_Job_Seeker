import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../Redux/Auth/action";
import JobSeekerConfigAPI from "../../Service/jobseeker";

function Login() {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState("");
  const {details} = useSelector(state => state.auth)

  const initialState = {
    email: "",
    password: "",
  };

  const SignUpDetails = { ...initialState };

  useEffect(()=>{
    if(!details.token){
      navigate("/login")
    }else{
      setTimeout(()=>{
        navigate("/");
       }, 700)
    }
  },[details])

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      ...SignUpDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        let payload= {
            ...values,
            password: btoa(values?.password)
        }
        try{
          console.log("--> payload :",payload)
      const response = await JobSeekerConfigAPI.loginJobSeeker(payload);
    
      if (response.data.status) {
       
         dispatch(AuthActions.login(response.data.data));
         setTimeout(()=>{
          navigate("/");
         }, 700)
       
      } else {
        setSnackBarOpen(true);
        setError(response.data.message);
      }
    }catch(err){
        console.log(err)
        setSnackBarOpen(true);
        setError(err.message);
    }
    },
  });

  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center ">
        {/* ^ Added 'h-screen' to make it full-screen and 'flex justify-center items-center' to center vertically and horizontally */}
        <div className="grid grid-cols-1 gap-4 border-y border-x rounded-md border-inherit px-8 py-5 w-4/12">
          <p className="text-2xl font-bold">Job Seeker Sign-In</p>
          <div className=" grid px-8 py-4 flex-wrap gap-6 ">
            <div className="flex flex-col justify-start">
              <TextField
                id="Email"
                label="Email Address"
                variant="outlined"
                size="small"
                value={formik?.values?.email}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email &&
                formik.errors.email && (
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
            If you don't have an account. Click here{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign-Up
            </span>
          </p>
        </div>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={()=>{setSnackBarOpen(false)}}
        message={error}
      />
    </React.Fragment>
  );
}

export default Login;
