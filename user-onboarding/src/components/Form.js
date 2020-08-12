import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
const [formState, setFormState] = useState({ // setting initial state to wait for user input
    name: '',
    email: '',
    password: '',
    terms: true
});

// onSubmit function goes here
const formSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted')
}


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
        type='text'
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
    <button type='submit'>Submit</button>
    </form>
);
};

export default Form;
