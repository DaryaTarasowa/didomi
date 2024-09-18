import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from "@mui/material";
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string()
        .min(5, 'Name should be of minimum 5 characters length')
        .required('Name is required'),
});

export const DidomiForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </Box>
        </div>
    );
};
