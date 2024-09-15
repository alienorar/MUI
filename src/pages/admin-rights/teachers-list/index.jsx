import axios from "axios"
import { useEffect, useState } from 'react';
import { TeacherTable, TeacherModal } from "@components";
import React from 'react'
import { Button } from "@mui/material";

const Index = () => {
    const [data, setData] = useState([]); // Teachers list
    const [open, setOpen] = useState(false); // Modal visibility
    const [course, setCourse] = useState([]); // Course list
    const [selectedTeacher, setSelectedTeacher] = useState(null); // Selected teacher for editing or adding new

    // Fetch teachers data
    useEffect(() => {
        axios.get("http://localhost:3000/teachers").then(res => {
            setData(res?.data);
        }).catch(err => console.log(err));
    }, []);

    // Fetch course data
    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:3000/course");
            setCourse(res?.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle modal open for adding new teacher
    const openModalForNewTeacher = () => {
        setSelectedTeacher(null); // No teacher selected for new entry
        fetchCourses(); // Fetch course data for dropdown
        setOpen(true);
    };

    // Handle modal open for editing an existing teacher
    const openModalForEdit = (teacher) => {
        setSelectedTeacher(teacher); // Set selected teacher for editing
        fetchCourses(); // Fetch course data
        setOpen(true);
    };

    // Close modal
    const handleClose = () => {
        setOpen(false);
    };

    // Update the data after adding or editing
    const handleUpdate = async () => {
        try {
            const res = await axios.get("http://localhost:3000/teachers");
            setData(res?.data); // Refresh the data list
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* TeacherModal handles both adding and editing */}
            <TeacherModal
                open={open}
                handleClose={handleClose}
                course={course}
                selectedTeacher={selectedTeacher}
                onSave={handleUpdate} // Callback to refresh data after modal action
            />
            <Button variant='contained' onClick={openModalForNewTeacher} sx={{ marginBottom: '20px' }}>
                Add New Teacher
            </Button>
            <TeacherTable
                data={data}
                onEdit={openModalForEdit} // Pass teacher data to edit modal
            />
        </div>
    );
}

export default Index;
