import * as Yup from "yup"

export const signInValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("Password is required")

});

// ============== Teacher =============

export const teacherTablevalidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Teacher name is required')
        .min(3, 'Name must be at least 3 characters'),

    course: Yup.string()
        .required('Course selection is required')
});