import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { TeacherModal } from '@components'
import axios from 'axios';

export default function BasicTable({ data }) {
    // const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [course, setCourse] = useState([])
    const [update, setUpdate] = useState()
    const handleClose = () => {
        setOpen(false)
    }

    const editItem = async (item) => {
        try {
            const res = await axios.get(`http://localhost:3000/teachers/${item.id}`);
            console.log("Updated:", item);

        } catch (error) {
            console.log(error);
  
        }
        setOpen(true)

    }

    const deleteItem = async (item) => {
        try {
            await axios.delete(`http://localhost:3000/teachers/${item.id}`);
            console.log("Deleted:", item.id);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TeacherModal open={open} handleClose={handleClose} update={update} course={course} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align='center'>Course</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="center">{item.course}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        onClick={() => editItem(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ backgroundColor: "red", color: "white", marginLeft: 1 }}
                                        onClick={() => deleteItem(item)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}
