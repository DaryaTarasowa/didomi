import DidomiForm from "../../components/Form/DidomiForm.tsx";
import { array, object, ObjectSchema, string } from "yup";

import { IConsentRequest, TConsentOptions } from "../../interfaces/consentIntefaces.ts";
import { useConsentMutation } from "../../Hooks/consentHooks.ts";
import { consentsDictionary } from "../../dictionaries/consentsDictionary.ts";
import { useNavigate } from 'react-router-dom';

export default function Consent() {

    const consentSchema: ObjectSchema<IConsentRequest> = object({
        email: string()
            .email('Enter a valid email')
            .required('Email is required'),
        name: string()
            .min(5, 'Name should be of minimum 5 characters length')
            .required('Name is required'),
        consentOptions: array().min(1, "At least one option must be selected").of(
            string().oneOf(Array.from(consentsDictionary.keys()) as TConsentOptions).required()
        ).required()
    });
    const successCallback = () => navigate("/consents");
    const { mutate } = useConsentMutation(successCallback);
    const navigate = useNavigate();
    const submitConsent = async (values: IConsentRequest) => {
        mutate(values);
    };

    return (
        <div>
            <h1>Consent Form</h1>
            <DidomiForm validationSchema={ consentSchema } onSubmit={ submitConsent }/>
        </div>
    )
}