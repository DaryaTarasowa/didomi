import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import DidomiForm from "./DidomiForm";
import { array, object, ObjectSchema, string } from "yup";
import { IConsentRequest, TConsentOptions } from "../../interfaces/consentIntefaces";
import { consentsDictionary } from "../../dictionaries/consentsDictionary";

let consentSchema: ObjectSchema<IConsentRequest>;

beforeAll(() => {
     consentSchema = object({
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
})

test('DidomiForm shows error hints correctly', async () => {

    render(<DidomiForm validationSchema={consentSchema} onSubmit={(values) => console.log(values)}/>)
    expect(screen.getByRole('button')).toBeDisabled();

    await userEvent.type(screen.getByPlaceholderText('Full Name'), "Dary");
    await userEvent.type(screen.getByPlaceholderText('Email Address'), "email");

    expect(screen.queryByText("Name should be of minimum 5 characters length")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    await userEvent.type(screen.getByPlaceholderText('Full Name'), "a");
    expect(screen.queryByText("Name should be of minimum 5 characters length")).not.toBeInTheDocument();
    expect(screen.queryByText("Enter a valid email")).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText('Email Address'), "@hello.world");

    expect(screen.queryByText("Enter a valid email")).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    await userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getByRole('button')).not.toBeDisabled();

})