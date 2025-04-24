import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <main class="flex items-center justify-center min-h-screen bg-white">
    <article class="p-4 max-w-[496px] w-full rounded-lg">
        <header class="mb-8">
            <div class="flex justify-center mb-8">
                <img src="./src/ProEdgeLogo.png" alt="ProEdge Logo" class="w-64 bg-[#182B55] p-2" width="278" height="55.21" />
            </div>
            <h1 class="text-4xl font-semibold mt-6 mb-4 text-[#182B55]">
                Sign in
            </h1>
            <p class="text-[#5D6576]">Welcome Back! Please sign in to continue.</p>
        </header>
        <form method="POST" action="#" class="space-y-6">
            <div class="my-4">
                <label for="email" class="block text-[#182B55] text-lg font-semibold">Email Address</label>
                <input type="email" id="email" name="email" class="w-full p-4 px-6 mt-4 border border-[#ECF0F9] rounded-4xl bg-[#F8F9FB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your email" required />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-[#182B55] text-lg font-semibold">Password</label>
                <input type="password" id="password" name="password"
                    class="w-full p-4 px-6 mt-4 border border-[#ECF0F9] rounded-4xl bg-[#F8F9FB] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your password" required />
            </div>
            <div class="flex justify-between mb-4">
                <div>
                    <input type="checkbox" name="keepMeLoggedIn" id="keepMeLoggedIn" />
                    <label for="keepMeLoggedIn" class="text-[#182B55]">Keep me logged in</label>
                </div>
                <div>
                    <Link to="/auth/forgot-password" class="text-[#182B55]">Forgot Password?</Link>
                </div>
            </div>
            <button type="submit" class="w-full bg-[#3F66BC] text-lg font-semibold text-white py-4 rounded-4xl hover:bg-[#2E4A8E] transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Log In
            </button>

            <div class="text-center mt-8 ">
                <p class="text-[#5D6576]">Don't have an account? <Link to="/auth/signup" class="text-blue-800">Sign Up</Link></p>
            </div>
        </form>
    </article>
</main>
  )
}

export default SignIn
