
import axios from "axios"
import { useEffect, useState } from 'react';
import { TeacherTable, TeacherModal } from "@components";
import React from 'react'
import { Button } from "@mui/material";
const Index = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [course, setCourse] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/teachers").then(res => {
            console.log(res);
            setData(res?.data)
        })
    }, []);
    const handleClose = () => {
        setOpen(false)
    }
    
    const openModal = async () => {
        await axios.get("http://localhost:3000/course").then(res => {
            // console.log(res);
            setCourse(res?.data)

        })
        setOpen(true)
    }
    return (
        <div>
            <TeacherModal open={open} handleClose={handleClose} course={course} />
            <Button variant='contained' onClick={openModal} sx={{ marginBottom: '20px' }} >Open modal</Button>
            <TeacherTable data={data}/>
        </div>
    )
}

export default Index