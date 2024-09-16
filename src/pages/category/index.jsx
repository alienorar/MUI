import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { categoryValidationSchema } from "../../utils/validation";
import { json } from "react-router-dom";


const Index = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingCategory, setEditingCategory] = useState(null); // State to track category being edited

    // Fetch categories and include token in headers
    const fetchCategories = async () => {
        setLoading(true);
        setError('');

        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get("https://texnoark.ilyosbekdev.uz/category/search?limit=10&page=1", {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            });
            const fetchedCategories = Array.isArray(res.data) ? res.data : res.data.categories || [];
            setCategories(fetchedCategories);
        } catch (error) {
            setError('Failed to load categories.');
            console.error(error);
        }
        setLoading(false);
    };

    // Handle category creation or update
    const handleSubmit = async (values) => {
        const token = localStorage.getItem('token'); // Retrieve the token
        try {
            if (editingCategory) {
                await axios.put(`https://texnoark.ilyosbekdev.uz/category/${editingCategory.id}`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEditingCategory(null);
            } else {
                await axios.post("https://texnoark.ilyosbekdev.uz/category/create", values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            fetchCategories();
        } catch (error) {
            console.error(error);
            setError('Failed to submit the category.');
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve the token
        try {
            await axios.delete(`https://texnoark.ilyosbekdev.uz/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchCategories();
        } catch (error) {
            console.error(error);
            setError('Failed to delete the category.');
        }
    };

    useEffect(() => {
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    return (
        <div className="flex w-full items-center justify-center flex-col gap-5 mt-7">
            <h1>Categories</h1>
            <div className="card w-80">
                <div className="card-header">
                    <h1 className="text-center text-[26px] text-blue"> {editingCategory ? 'Edit Category' : 'Create Category'}</h1>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={{
                            category_name: editingCategory ? editingCategory.name : ''
                        }}
                        validationSchema={categoryValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
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
                                {editingCategory ? 'Update' : 'Submit'}
                            </Button>
                        </Form>
                    </Formik>
                </div>
            </div>

            <div className="mt-5">
                <h2>Category List</h2>
                {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                    <ul>
                        {categories.length > 0 ? categories.map(category => (
                            <li key={category.id} className="flex justify-between items-center mb-3">
                                <span>{category.name}</span>
                                <div>
                                    <Button variant="contained" color="secondary" onClick={() => handleEdit(category)} sx={{ marginRight: "10px" }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(category.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </li>
                        )) : <p>No categories found</p>}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Index;
