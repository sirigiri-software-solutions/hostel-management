import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
// import Navigation from '../../Navigation'
import {Link} from 'react-router-dom'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Reset error when input changes
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    let formValid = true;
    const newErrors = { ...errors };
  
    // Check for empty fields
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email';
      formValid = false;
    }
  
    if (password.trim() === '') {
      newErrors.password = 'Please enter your password';
      formValid = false;
    }
  
    if (!formValid) {
      setErrors(newErrors);
      return; // Don't proceed with submission if form is invalid
    }
  
    // Proceed with form submission if all fields are filled
    axios
      .get('https://signuppage-2f4c8-default-rtdb.firebaseio.com/register.json')
      .then((response) => {
        const userData = response.data;
        const users = Object.values(userData);
        const user = users.find(user => user.email === email);
        if (user) {
          if (user.password === password) {
            alert('Login Successful');
            // Here you can redirect the user to another page or perform other actions upon successful login
          } else {
            alert('Invalid email or password');
          }
        } else {
          alert('User not found');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
      });
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <form autoComplete='off' onSubmit={submitHandler}>
          <input
            type='email'
            name='email'
            value={email}
            onChange={changeHandler}
            placeholder='Enter Your Email'
            className='user-input'
          />
          <br />
          {errors.email && <div className='error'>{errors.email}</div>}
          <input
            type='password'
            name='password'
            value={password}
            onChange={changeHandler}
            placeholder='Enter Your Password'
            className='user-input'
          />
          <br />
          {errors.password && <div className='error'>{errors.password}</div>}
          <input type='submit' className='Login' value='Login' />
        </form>
        <p>Don't have an account? <button><Link to="/signup">Signup</Link></button></p>
      </div>
    </div>
  );
};

export default Login;
