import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from "@mui/material";
import "./DidomiForm.css";
import { consentsDictionary } from "../../dictionaries/consentsDictionary.ts";
import { TConsentOptions } from "../../interfaces/consentIntefaces.ts";
import {
    AnyObject,
    ObjectSchema,
} from "yup";

const consentOptions = Array.from(consentsDictionary.keys()) as TConsentOptions;

interface IDidomiProps<T> {
    validationSchema: ObjectSchema<AnyObject, T>
    onSubmit: (values: any) => void;
}

export default function DidomiForm<T>(props: IDidomiProps<T>) {
    const { validationSchema, onSubmit } = props;

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            consentOptions: [] as TConsentOptions
        },
        validationSchema,
        onSubmit,
    });

    return (
        <Box component="form" onSubmit={ formik.handleSubmit } className="didomi-form">
            <Box className="didomi-form__row">
                <TextField
                    id="consents-form__name"
                    test-id="consents-form__name_input"
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
                    error={ formik.touched.consentOptions && Boolean(formik.errors.consentOptions) }>
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
                    { formik.touched.consentOptions && formik.errors.consentOptions &&
                        <Box className="didomi-form__error-message">{ formik.errors.consentOptions }</Box>
                    }
                </FormControl>
            </Box>

            <Button color="primary" variant="contained" type="submit" disabled={!formik.dirty ||
                Boolean(formik.errors.consentOptions || formik.errors.name || formik.errors.email) }>
                Give consent
            </Button>
        </Box>
    )
        ;
};
