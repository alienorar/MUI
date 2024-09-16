import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { categoryValidationSchema } from "../../utils/validation";
import { json } from "react-router-dom";


const Index = () => {
const initialValues ={
    category_name:""
}


    return (
        <div className="flex w-full items-center justify-center flex-col gap-5 mt-7">
            <div className="card w-80">
                <div className="card-header">
                    <h1 className="text-center text-[26px] text-blue"> Categories</h1>
                </div>
                <div className="card-body">
                    <Formik validationSchema={categoryValidationSchema} initialValues={initialValues}>
                        <Form className="flex flex-col">
                            <Field
                                name="category_name"
                                type="text"
                                label="Category Name"
                                variant="outlined"
                                as={TextField}
                                fullWidth
                                helperText={<ErrorMessage name="category_name" component="p" className="text-red-800 text-[16px]" />}
                            />
                            <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "10px", maxWidth: "160px" }}>
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>


        </div>
    );
};

export default Index;
