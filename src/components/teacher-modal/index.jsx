import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

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
    gap: 2, // Spacing between form elements
};

export default function TransitionsModal({ open, handleClose, course }) {
    const [form, setForm] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/teachers", form)
            console.log(res);

        } catch (error) {
            console.log(error);

        }

        handleClose()
        // console.log(form);

    }

    return (
        <div>
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
                            Add New Teacher
                        </Typography>
                        <form className='flex flex-col gap-3' >
                            <TextField
                                id='name'
                                name='name'
                                label='Teacher Name'
                                onChange={handleChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="course-label">Course</InputLabel>
                                <Select
                                    labelId="course-label"
                                    id="course-select"
                                    name="course"

                                    onChange={handleChange}
                                >
                                    {
                                        course?.map((item, index) => {
                                            return <MenuItem value={item.name} key={index}>{item.name} </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant='contained' type="submit" onClick={handleSubmit}>Save</Button>
                                <Button variant='contained' sx={{ backgroundColor: "red" }} onClick={handleClose}>Cancel</Button>
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
