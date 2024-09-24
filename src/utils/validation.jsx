
import * as Yup from "yup"


// <============ Sign In =============>

export const signInValidationSchema = Yup.object().shape({
    phone_number: Yup.string().required("Phone number is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("Password is required")

});

// <============== Teacher =============>
export const teacherTablevalidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Teacher name is required')
        .min(3, 'Name must be at least 3 characters'),

    course: Yup.string()
        .required('Course selection is required')
});


// <============ Sign Up =============>
export const signUpValidationSchema = Yup.object().shape({
    first_name: Yup.string().required(" First name is required"),
    last_name: Yup.string().required(" Last name is required"),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("Password is required")

});

// phone_number: '+998977770777', password: 'MaxFax'


// <============ Category ==========>
export const categoryValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Category name is required')
        .min(3, 'Name must be at least 3 characters'),
});


// <============ Brand ==========>
export const brandValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Brand name is required')
        .min(3, 'Name must be at least 3 characters'),
    description: Yup.string()
        .required('Description is required'),
    category_id: Yup.string()
        .required('Choosing category is required'),
});