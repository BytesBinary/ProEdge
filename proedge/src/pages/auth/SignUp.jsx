// src/pages/auth/SignUp.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/utils/button/Button'
import TextInput from '../../components/common/form/TextInput'
import AuthHeader from '../../components/auth/AuthHeader'

const SignUp = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <article className="p-4 max-w-xl w-full rounded-lg my-7">
        <AuthHeader title="Create Account" subtitle="Please create an account." />
        
        <form method="POST" action="#" className="space-y-6">
          <TextInput label="First Name" id="firstName" name="firstName" placeholder="Enter your first name" required />
          <TextInput label="Last Name" id="lastName" name="lastName" placeholder="Enter your last name" required />
          <TextInput type="email" label="Email Address" id="email" name="email" placeholder="Enter your email" required />
          <TextInput type="password" label="Password" id="password" name="password" placeholder="Enter your password" required />
          <TextInput type="password" label="Confirm Password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />

          <Button label="Sign up" />
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-blue-800">Sign In</Link>
          </p>
        </div>
      </article>
    </main>
  )
}

export default SignUp
