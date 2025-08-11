import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { loginUser, logoutUser } from '../services/authServices'
import { useQueryClient } from '@tanstack/react-query'
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'

const schema = yup.object().shape({
    email: yup.string().email("Invalid Email! Please enter a valid email.").required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})


const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [showPass, setShowpass] = useState(false);

    const { refetch } = useAuth();

    const onSubmit = async (data) => {
        try {
            await loginUser(data);
            await refetch();
            toast.success("Successfully logged in!");
            await queryClient.invalidateQueries(['cart']);
            navigate('/products');
        } catch (err) {
            console.error("Login failed: ", err.response?.data || err.message);
            toast.error(`Login Failed: ${err.message}`)
        }
    }

    const queryClient = useQueryClient();
    const handleLogout = async () => {
        try {
            await logoutUser();
            queryClient.removeQueries(['me']);
            toast.success("Current session ended.")
            navigate('/');
        } catch (err) {
            toast.error("Error occoured while loggin out. please try again later.")
            console.error("Logout failed:", err);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-4'>

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input {...register('email')} type="email" className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input {...register('password')} type={showPass ? "text" : "password"} className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="••••••••" />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        <span className="absolute right-3 top-8 text-gray-500 cursor-pointer" onClick={() => setShowpass(prev => !prev)}>
                            <i className={showPass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                        </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                        <label><input type="checkbox" className="mr-2" />Remember me</label>
                        <a href="#" className="text-black hover:underline">Forgot password?</a>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200">
                        Log In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don't have an account?
                    <Link to={'/signup'} className="text-black font-medium hover:underline">Sign up</Link> <br />
                    <span onClick={handleLogout} className="text-black font-medium hover:underline">LogOut</span>
                </p>
            </div>
        </div>

    )
}

export default Login