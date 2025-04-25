import React from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/common/utils/TextInput";
import AuthHeader from "../../components/auth/AuthHeader";
import CheckboxWithLabel from "../../components/common/utils/CheckBoxWithLabel";
import Button from "../../components/common/utils/Button";

const SignIn = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <article className="p-4 max-w-xl w-full rounded-lg">
        <AuthHeader
          title="Sign in"
          subtitle="Welcome Back! Please sign in to continue."
        />

        <form method="POST" action="#" className="space-y-6">
          <TextInput
            type="email"
            label="Email Address"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <TextInput
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <div className="flex justify-between mb-4">
            <CheckboxWithLabel
              id="keepMeLoggedIn"
              name="keepMeLoggedIn"
              label="Keep me logged in"
            />
            <Link to="/auth/forgot-password" className="text-[#182B55]">
              Forgot Password?
            </Link>
          </div>

         
          <Button label="Log in" />

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
