import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import React from "react";
import { FlipWords } from "../components/flip-words";

export default function SignUp(){
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const words = ["better", "cute", "beautiful", "modern"];
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

    function FlipWordsDemo() {
      return (
        <div >
          <div className="text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 ">
            Now Build <br/><br/><FlipWords words={words} /> <br/><br/>  business with<br/><br/>
            <span className='px-2 py--1 bg-gradient-to-r from-indigo-500 via-indifo-500 to-blue-500 rounded-lg text-white font-bold'>
              Lead
            </span>
            <span className="font-bold"> Geniee</span>
          </div>
        </div>
      );
    }
  
  

  return (
    <div className='min-h-screen mt-10'>
      <div className='flex p-8 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-12'>
  {/* Left Section */}
  <div className='flex-1 flex flex-col justify-center items-center'>
    <div className="flex justify-center">
      <FlipWordsDemo />
    </div>
  </div>

  {/* Right Section */}
  <div className='flex-1 pl-12'> {/* Added left padding for additional spacing */}
    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
      <div>
        <Label value='Your username' />
        <TextInput
          type='text'
          placeholder='Username'
          id='username'
          onChange={handleChange}
        />
      </div>
      <div>
        <Label value='Your email' />
        <TextInput
          type='email'
          placeholder='name@company.com'
          id='email'
          onChange={handleChange}
        />
      </div>
      <div>
        <Label value='Your password' />
        <TextInput
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
        />
      </div>
      <Button
        gradientDuoTone='purpleToBlue'
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size='sm' />
            <span className='pl-3'>Loading...</span>
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
      <OAuth />
    </form>

    <div className='flex gap-2 text-sm mt-6'> {/* Increased top margin */}
      <span>Have an account?</span>
      <Link to='/sign-in' className='text-blue-500'>
        Sign In
      </Link>
    </div>

    {errorMessage && (
      <Alert className='mt-6' color='failure'> {/* Increased top margin */}
        {errorMessage}
      </Alert>
    )}
  </div>
</div>

    </div>
 
  );
}
