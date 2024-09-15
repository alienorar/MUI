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
const index = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    password: ''
  };

  // const signInValidationSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("Password is required")

  // });

  const handleSubmit = async (values) => {
    console.log(values);
    navigate("/admin-layout")
  };

  return (
    <div>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center mt-5 p-5 ">
        <div className="card w-25">
          <div className="card-header">
            <Typography variant="h4" component="h2">
              Login
            </Typography>
          </div>
          <div className="card-body">
            {/* <form className="d-flex flex-column gap-3" onSubmit={handleSubmit} id="form">
              <TextField id="outlined-basic" label="Username" variant="outlined" name="username"
                size="small" sx={{ width: 1 }} onChange={handleChange} disabled={count === 3 ? true : false} />
              <TextField id="outlined-basic" label="password" variant="outlined" type="password"
                size="small" sx={{ width: 1 }} onChange={handleChange} name="password" disabled={count === 3 ? true : false} />
            </form> */}
            <Formik initialValues={initialValues} validationSchema={signInValidationSchema} onSubmit={handleSubmit} >
              <Form id="sign-in" className="flex flex-col ">
                <Field
                  name="name"
                  type="text"
                  label="name"
                  variant="outlined"
                  as={TextField}
                  fullwidth
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="name"
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

