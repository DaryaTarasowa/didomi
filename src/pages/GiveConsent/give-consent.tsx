import DidomiForm from "../../components/Form/DidomiForm.tsx";
import { object, string, array, ObjectSchema } from "yup";

import { IConsentRequest } from "../../interfaces/consentIntefaces.ts";

export default function Consent() {

    const consentSchema: ObjectSchema<IConsentRequest> = object({
        email: string()
            .email('Enter a valid email')
            .required('Email is required'),
        name: string()
            .min(5, 'Name should be of minimum 5 characters length')
            .required('Name is required'),
        consentOptions: array().min(1, "At least one option must be selected").of(string().min(1).required()).required()
    });

    return (
        <div>
            <h1>Consent Form</h1>
            <DidomiForm validationSchema={consentSchema} />
        </div>
    )
}