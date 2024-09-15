import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { teacherTablevalidationSchema } from '../../utils/validation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

export default function TransitionsModal({ open, handleClose, course, selectedTeacher, onDelete }) {
    const initialValues = {
        name: selectedTeacher?.name || '',
        course: selectedTeacher?.course || ''
    };

    useEffect(() => {
        if (selectedTeacher) {
            // Update form with selected teacher details
            setForm(initialValues);
        }
    }, [selectedTeacher]);

    const [form, setForm] = useState(initialValues);

    const handleSubmit = async (values) => {
        try {
            if (selectedTeacher) {
                // Edit existing teacher
                const res = await axios.put(`http://localhost:3000/teachers/${selectedTeacher.id}`, values);
                console.log("Updated:", res);
            } else {
                // Add new teacher
                const res = await axios.post("http://localhost:3000/teachers", values);
                console.log("Added:", res);
            }
        } catch (error) {
            console.log(error);
        }

        handleClose();
    };

    const handleDelete = async () => {
        if (selectedTeacher) {
            try {
                await axios.delete(`http://localhost:3000/teachers/${selectedTeacher.id}`);
                console.log("Deleted:", selectedTeacher.id);
                if (onDelete) onDelete(selectedTeacher.id);
            } catch (error) {
                console.log(error);
            }
            handleClose();
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" id="transition-modal-title" gutterBottom>
                        {selectedTeacher ? "Edit Teacher" : "Add New Teacher"}
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={teacherTablevalidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form className='flex flex-col gap-3' id='teacher-table'>
                            <Field
                                name="name"
                                type="text"
                                label="Name"
                                variant="outlined"
                                as={TextField}
                                fullWidth
                                margin="normal"
                                helperText={
                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="text-red-800 text-[16px]"
                                    />
                                }
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Course</InputLabel>
                                <Field
                                    name="course"
                                    as={Select}
                                    label="Course"
                                >
                                    {course?.map((item, index) => (
                                        <MenuItem value={item.name} key={index}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <ErrorMessage
                                    name="course"
                                    component="p"
                                    className="text-red-800 text-[16px]"
                                />
                            </FormControl>

                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant='contained' type="submit">
                                    {selectedTeacher ? "Update" : "Save"}
                                </Button>
                                <Button variant='contained' sx={{ backgroundColor: "red" }} onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Box>

                            {selectedTeacher && (
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: "red" }}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </Form>
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
}
