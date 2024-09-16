import { Navigate, Outlet } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Notification from "../../utils/notification";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../utils/validation";
import axios from "axios";
const index = () => {
  const navigate = useNavigate();

  const initialValues = {
    phone_number: '',
    password: ''
  };

  // const signInValidationSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("Password is required")

  // });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post("https://texnoark.ilyosbekdev.uz/auth/sign-in", values)
      console.log(response);

      if (response.status === 201) {
        navigate("/category")
      }
    } catch (error) {
      console.log(error);

    }

  };

  return (
    <div>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center mt-5 p-5 ">
        <div className="card w-25">
          <div className="card-header">
            <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
              Sign in
            </Typography>
          </div>
          <div className="card-body">
            <Formik initialValues={initialValues} validationSchema={signInValidationSchema} onSubmit={handleSubmit} >
              <Form id="sign-in" className="flex flex-col ">
                <Field
                  name="phone_number"
                  type="text"
                  label="Phone number"
                  variant="outlined"
                  as={TextField}
                  fullwidth
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="phone_number"
                      component="p"
                      className="text-red-800 text-[16px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type="password"
                  label="password"
                  variant="outlined"
                  as={TextField}
                  fullwidth
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-800 text-[16px]"
                    />
                  }
                />
                <Button variant="contained" color="primary" type="submit" form="sign-in" sx={{ marginTop: "10px", maxWidth: "160px" }} >
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        </div>

      </div>

      <Outlet />
    </div>
  )
}

export default index

