import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/common/form/TextInput";
import AuthHeader from "../../components/auth/AuthHeader";
import CheckboxWithLabel from "../../components/common/form/CheckBoxWithLabel";
import Button from '../../components/common/utils/button/Button';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepMeLoggedIn: false
  });

  const [errors, setErrors] = useState({});
  const {login,loading}=useAuth();



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});

    e.preventDefault();
    const result = await login(formData.email, formData.password);  
    if (result.success) {
      navigate('/');
    } else {
      setErrors(result.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <article className="p-4 max-w-xl w-full rounded-lg">
        <AuthHeader
          title="Sign in"
          subtitle="Welcome Back! Please sign in to continue."
        />

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex justify-between mb-4">
            <CheckboxWithLabel
              id="keepMeLoggedIn"
              name="keepMeLoggedIn"
              label="Keep me logged in"
              checked={formData.keepMeLoggedIn}
              onChange={handleChange}
            />
            <Link to="/auth/forgot-password" className="text-[#182B55]">
              Forgot Password?
            </Link>
          </div>

          {errors.submit && (
            <div className="text-red-600 text-center">{errors.submit}</div>
          )}

          <Button
            type="submit"
            bgColor="bg-[#3F66BC]"
            hoverColor="hover:bg-[#2E4A8E]"
            textColor="text-white"
            label={loading ? 'Signing in...' : 'Sign In'}
            disabled={loading}
          />

          <div className="text-center mt-8">
            <p className="text-[#5D6576]">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="text-blue-800">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </article>
    </main>
  );
};

export default SignIn;