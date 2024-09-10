
import axios from "axios"
import { useEffect, useState } from 'react';
import { TeacherTable } from "@components";
import React from 'react'

const Index = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/teachers").then(res => {
            console.log(res);
            setData(res?.data)
            console.log(setData(res?.data));

        })
    }, []);
    return (
        <div>
            <h1>rdtgykl</h1>
            <TeacherTable data={data} />
        </div>
    )
}

export default Index