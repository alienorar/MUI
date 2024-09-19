import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { categoryValidationSchema } from "@validation";
import { category } from "@service";

const Index = () => {
  const initialValues = {
    name: ""
  }

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await category.create(values)
      console.log(category.id);

      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className="flex w-full items-center justify-center flex-col gap-5 mt-7">
      <div className="card w-80">
        <div className="card-header">
          <h1 className="text-center text-[26px] text-blue"> Categories</h1>
        </div>
        <div className="card-body">
          <Formik validationSchema={categoryValidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col">
              <Field
                name="name"
                type="text"
                label="Category Name"
                variant="outlined"
                as={TextField}
                fullWidth
                helperText={<ErrorMessage name="name" component="p" className="text-red-800 text-[16px]" />}
              />
              <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "10px", maxWidth: "120px", display: "inline-block" }}>
                Create
              </Button>

              <Button variant="contained" color="secondary" type="submit" sx={{ marginTop: "10px", maxWidth: "120px" }}>
                Update
              </Button>
            </Form>
          </Formik>
        </div>
      </div>


    </div>
  );
};

export default Index;
