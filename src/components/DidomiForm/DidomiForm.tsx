import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import * as yup from 'yup';
import "./DidomiForm.css";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string()
        .min(5, 'Name should be of minimum 5 characters length')
        .required('Name is required'),
    consentOptions: yup.array().min(1).of(yup.string().min(1).required()).required("At least one option must be selected")
});

const consentOptions = ["newsletter", "targetedAds", "statistics"];

export const DidomiForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            consentOptions: [] as string[]
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Box component="form" onSubmit={ formik.handleSubmit } className="didomi-form">
            <Box className="didomi_form-row">
                <TextField
                    id="name"
                    name="name"
                    size="small"
                    className="didomi_form-field"
                    value={ formik.values.name }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.name && Boolean(formik.errors.name) }
                    helperText={ formik.touched.name && formik.errors.name }
                    placeholder={ "Full Name" }
                    style={ { width: "300px" } }
                />
                <TextField
                    id="email"
                    name="email"
                    size="small"
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.email && Boolean(formik.errors.email) }
                    helperText={ formik.touched.email && formik.errors.email }
                    placeholder={ "Email Address" }
                    style={ { width: "300px" } }
                />
            </Box>
            <Box className="didomi_form-row">
                <Box>I agree to:</Box>
            </Box>
            <Box className="didomi_form-row">
                <FormControl
                    error={formik.touched.consentOptions && Boolean(formik.errors.consentOptions)}>
                    <FormGroup className="didomi_form-group">
                        { consentOptions.map((option) => (
                            <FormControlLabel
                                key={ option }
                                label={ option }
                                control={
                                    <Checkbox
                                        id={ option }
                                        name={ option }
                                        onChange={ (e) => {
                                            if (e.target.checked) {
                                                formik.values.consentOptions.push(option);
                                                formik.handleChange(e);
                                            } else {
                                                const index = formik.values.consentOptions.indexOf(option);
                                                formik.values.consentOptions.splice(index, 1);
                                                formik.handleChange(e);
                                            }
                                        } }
                                        checked={ formik.values.consentOptions.includes(option) }
                                        onBlur={ formik.handleBlur }
                                    />
                                }
                            />
                        )) }
                    </FormGroup>
                </FormControl>
            </Box>

            <Button color="primary" variant="contained" fullWidth type="submit">
                Give consent
            </Button>
        </Box>
    )
        ;
};
