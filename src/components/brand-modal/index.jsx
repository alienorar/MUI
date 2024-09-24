import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Select, TextField, InputLabel, MenuItem } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { brandValidationSchema } from "@validation";
import { brand } from "@service"
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, handleClose, update, getData, categories }) {


    const initialValues = {
        name: update?.name || "",
        description: update?.description || "",
        category_id: update?.category_id || "",
        file: update?.file || "",

    };

    const [file, setFile] = useState({})
    const handleChange = (e) => {
        setFile(e.target.files[0])
        console.log(file);

    }

    const handleSubmit = async (value) => {
        let form = new FormData();
        form.append("name", value.name);
        form.append("category_id", value.category_id);
        form.append("description", value.description);
        form.append("file", file);

        try {
            if (update?.id) {
                await brand.update(update.id,form);
                console.log(form);
                
                handleClose();
                getData();
            } else {
                await brand.create(form);
                console.log(form);
                
                handleClose();
                getData();
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={initialValues}
                        validationSchema={brandValidationSchema}
                        enableReinitialize
                    >
                        <Form>
                            <FormControl fullWidth className="flex flex-col gap-3">
                                <Field
                                    name="name"
                                    label="Brand"
                                    as={TextField}
                                    fullWidth
                                />

                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="text-red-500"
                                />
                                <Field
                                    name="description"
                                    label="Description"
                                    as={TextField}
                                    fullWidth
                                />

                                <ErrorMessage
                                    name="description"
                                    component="p"
                                    className="text-red-500"
                                />
                                <FormControl fullWidth>
                                    <InputLabel>category</InputLabel>
                                    <Field
                                        name="category_id"
                                        as={Select}
                                        label="category"
                                    >
                                        {categories?.map((item, index) => (
                                            <MenuItem value={item.id} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="category_id"
                                        component="p"
                                        className="text-red-800 text-[16px]"
                                    />
                                </FormControl>
                                <FormControl>
                                    <input type="file" onChange={handleChange} />
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </FormControl>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}