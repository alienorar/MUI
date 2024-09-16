import { Navigate, Outlet } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { NavLink } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
// import Notification from "../../utils/notification";
import { signUpValidationSchema } from "../../utils/validation";
// import { signUpValidationSchema } from "@validation";
const index = () => {
    const navigate = useNavigate();

    const initialValues = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: ''
    };

    const handleSubmit = async (values) => {
        console.log(values);
        // navigate("/sign-up")
        try {
            const res = await axios.post("https://texnoark.ilyosbekdev.uz/auth/admin/sign-up", values)
            console.log(res);
            if (res.status = 201) {
                navigate("/sign-in")
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
                        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }} className="text-blue">
                            Sign up
                        </Typography>
                    </div>
                    <div className="card-body">
                        <Formik initialValues={initialValues} validationSchema={signUpValidationSchema} onSubmit={handleSubmit} >
                            <Form id="sign-in" className="flex flex-col ">
                                <Field
                                    name="first_name"
                                    type="text"
                                    label="First name"
                                    variant="outlined"
                                    as={TextField}
                                    fullwidth
                                    // margin="normal"
                                    helperText={
                                        <ErrorMessage
                                            name="first_name"
                                            component="p"
                                            className="text-red-800 text-[16px]"
                                        />
                                    }
                                />
                                <Field
                                    name="last_name"
                                    type="text"
                                    label="Last name"
                                    variant="outlined"
                                    as={TextField}
                                    fullwidth
                                    margin="normal"
                                    helperText={
                                        <ErrorMessage
                                            name="last_name"
                                            component="p"
                                            className="text-red-800 text-[16px]"
                                        />
                                    }
                                />
                                <Field
                                    name="phone_number"
                                    type="text"
                                    label="Phone number"
                                    variant="outlined"
                                    as={TextField}
                                    fullwidth
                                    // margin="normal"
                                    helperText={
                                        <ErrorMessage
                                            name="phone_number"
                                            component="p"
                                            className="text-red-800 text-[16px]"
                                        />
                                    }
                                />
                                <Field
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    as={TextField}
                                    fullwidth
                                    margin="normal"
                                    helperText={
                                        <ErrorMessage
                                            name="email"
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

                        <Typography variant="body2" align="center" sx={{ marginTop: "20px", }} />
                        Already have an account?
                        <NavLink to="/sign-in" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold', marginLeft: "10px" }}>
                            Sign In
                        </NavLink>


                    </div>
                </div>

            </div>

            <Outlet />
        </div>
    )
}

export default index

