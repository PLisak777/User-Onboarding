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

// Set state for Server Error
const [serverError, setServerError] = useState("");

// Manage state for errors
const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
})

const [post, setPost] = useState([]);

// Set submit button disabled until all validation has completed
const [buttonDisabled, setButtonDisabled] = useState(true);

// onSubmit function goes here
const formSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted')
    axios
    .post(`https://reqres.in/api/users`, formState)
    .then((res) => {
        setPost(res.data)
        console.log('Request Successful', res.data)
        setServerError(null)
        setFormState({
            name: "",
            email: "",
            password: "",
            terms: true
        })
    })
    .catch((err) => {
        setServerError('Your Request Has Failed')
    })
}

// onChange function goes here
const inputChange = (e) => {
    e.persist(); // Has something to do with async code, should get clarification...
    const newFormData = {
        ...formState,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    changeValidation(e);
    setFormState(newFormData);
}

// Inline validation handling
const changeValidation = (e) => {
    yup
    .reach(formSchema, e.target.name) // goes inside schema to get rules
    .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
    .then((valid) => {
        setErrors({ // will set the error to display error shown in schema
            ...errors, 
            [e.target.name]: ""
        })
    })
    .catch((err) => {
        console.log(err);
        setErrors({
            ...errors,
            [e.target.name] : err.errors[0] // each error is the first item in its list
        })
    })
}

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
    formSchema.isValid(formState).then((valid) => {
        setButtonDisabled(!valid)
    })
}, [formState])

return (
    <form onSubmit={formSubmit}>
{serverError ? <p className='error'>{serverError}</p>: null}

    <label htmlFor='name'>
        Name
        <input
        id='name'
        type='text'
        name='name'
        data-cy='name'
        value={formState.name}
        onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p>: null}
    </label>
    <label htmlFor='email'>
        Email
        <input
        id='email'
        type='text'
        name='email'
        data-cy='email'
        value={formState.email}
        onChange={inputChange}
        />
        {errors.email.length > 0 ? <p className='error'>{errors.email}</p>: null}
    </label>
    <label htmlFor='password'>
        Password
        <input
        id='password'
        type='password'
        name='password'
        data-cy='password'
        value={formState.password}
        onChange={inputChange}
        />
        {errors.password.length > 0 ? <p className='error'>{errors.password}</p>: null}
    </label>
    <label htmlFor='name'>
        Terms & Conditions
        <input
        id='terms'
        type='checkbox'
        name='terms'
        data-cy='terms'
        checked={formState.terms}
        onChange={inputChange}
        />
    </label>
    {/* Display data for each user */}
    <pre>{JSON.stringify(post, null, 2)}</pre>
    <button data-cy='submit' disabled={buttonDisabled} type='submit'>Submit</button>
    </form>
);
};

export default Form;
