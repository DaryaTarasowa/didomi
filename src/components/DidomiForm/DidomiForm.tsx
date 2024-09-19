import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import * as yup from 'yup';
import "./DidomiForm.css";
import { consentsDictionary } from "../../dictionaries/consentsDictionary.ts";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string()
        .min(5, 'Name should be of minimum 5 characters length')
        .required('Name is required'),
    consentOptions: yup.array().min(1, "At least one option must be selected").of(yup.string().min(1).required()).required()
});

const consentOptions = Array.from(consentsDictionary.keys());

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
            <Box className="didomi-form__row">
                <TextField
                    id="name"
                    name="name"
                    size="small"
                    className="didomi-form__field"
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
            <Box className="didomi-form__row">
                <Box>I agree to:</Box>
            </Box>
            <Box className="didomi-form__row">
                <FormControl
                    error={formik.touched.consentOptions && Boolean(formik.errors.consentOptions)}>
                    <FormGroup className="didomi-form__group">
                        { consentOptions.map((option) => (
                            <FormControlLabel
                                key={ option }
                                label={ consentsDictionary.get(option) }
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
                    <Box className="didomi-form__error-message">{formik.errors.consentOptions}</Box>
                </FormControl>
            </Box>

            <Button color="primary" variant="contained" type="submit">
                Give consent
            </Button>
        </Box>
    )
        ;
};
