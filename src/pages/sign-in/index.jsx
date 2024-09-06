import { Navigate, Outlet } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Notification from "../../utils/notification";

const index = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value })
  };
  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(form);
    if (form.username === "admin") {
      navigate("/admin-layout")
    } else if (form.username === "student") {
      navigate("/student-layout")
    } else {
      Notification({ title: "Invalid username", type: "error" })
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center mt-5 p-5 ">
        <div className="card w-25">
          <div className="card-header">
            <Typography variant="h4" component="h2">
              Login
            </Typography>
          </div>
          <div className="card-body">
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit} id="form">
              <TextField id="outlined-basic" label="Username" variant="outlined" name="username"
                size="small" sx={{ width: 1 }} onChange={handleChange} />
              <TextField id="outlined-basic" label="password" variant="outlined" type="password"
                size="small" sx={{ width: 1 }} onChange={handleChange} name="password" />
            </form>
          </div>
          <div className="card-footer">
            <Button variant="contained" color="success" size="small" type="submit" form="form">
              Submit
            </Button>
          </div>
        </div>

      </div>

      <Outlet />
    </div>
  )
}

export default index

