import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/utils/button/Button';
import TextInput from '../../components/common/form/TextInput';
import AuthHeader from '../../components/auth/AuthHeader';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Simple form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // GraphQL Mutation for user registration
  const SIGN_UP_MUTATION = `
    mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      customer(data: {
        first_name: $firstName
        last_name: $lastName
        email: $email
        password: $password
      }) {
        id
        first_name
        last_name
        email
      }
    }
  `;

  // Handle form submission with GraphQL request
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("yaa")

  
    if (!validate()) return;
  
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/graphql`, 
        {
          query: SIGN_UP_MUTATION,
          variables: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('GraphQL response:', response.data);
  
      if (response.data.errors) {
        setErrors({ submit: 'Sign up failed. Please try again later.' });
      } else {
        // Success - redirect or show success message
        console.log('Sign up successful:', response.data);
      }
    } catch (error) {
      console.error('Sign up failed:', error.response || error);
      setErrors({ submit: 'Sign up failed. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <article className="p-4 max-w-xl w-full rounded-lg my-7">
        <AuthHeader title="Create Account" subtitle="Please create an account." />

        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="First Name"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={errors.firstName}
          />
          <TextInput
            label="Last Name"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={errors.lastName}
          />
          <TextInput
            type="email"
            label="Email Address"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          <TextInput
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
          <TextInput
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />

          {errors.submit && (
            <div className="text-red-600 text-center">{errors.submit}</div>
          )}
          <button  type='submit'>btn</button>

          <Button 
           onClick={handleSubmit}
            bgColor="bg-[#3F66BC]" 
            hoverColor="hover:bg-[#2E4A8E]" 
            textColor="text-white" 
            label={loading ? 'Signing up...' : 'Sign up'} 
            disabled={loading} 
          />
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-blue-800">Sign In</Link>
          </p>
        </div>
      </article>
    </main>
  );
};

export default SignUp;
