import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
    // Setting up state for the form
const [formState, setFormState] = useState({ // setting initial state to wait for user input
    name: '',
    email: '',
    password: '',
    terms: true
});

// Watch for Server Error
const [serverError, setServerError] = useState("");

// Set submit button disabled until all validation has completed
const [buttonDisabled, setButtonDisabled] = useState(true);

// onSubmit function goes here
const formSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted')
}

// onChange function goes here


// Create form schema to tell yup what to validate
const formSchema = yup.object().shape({
    name: yup
    .string()
    .required("Name is a required field"),
    email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is a required field"),
    password: yup
    .string()
    .required("Password is required"),
    terms: yup
    .boolean()
    .oneOf([true], "Please agree to Terms & Conditions before continuing")
})

//Validate entire form when input changes
useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
        setButtonDisabled(!isValid)
    })
}, [formState])

return (
    <form>
    <label htmlFor='name'>
        Name
        <input
        id='name'
        type='text'
        name='name'
          //   value={formState.name}
          //   onChange={inputChange}
        />
    </label>
    <label htmlFor='email'>
        Email
        <input
        id='email'
        type='text'
        name='email'
          //   value={formState.email}
          //   onChange={inputChange}
        />
    </label>
    <label htmlFor='password'>
        Password
        <input
        id='password'
        type='password'
        name='password'
          //   value={formState.name}
          //   onChange={inputChange}
        />
    </label>
    <label htmlFor='name'>
        Terms & Conditions
        <input
        id='terms'
        type='checkbox'
        name='terms'
          //   checked={formState.terms}
          //   onChange={inputChange}
        />
    </label>
    <button disabled={buttonDisabled} type='submit'>Submit</button>
    </form>
);
};

export default Form;
