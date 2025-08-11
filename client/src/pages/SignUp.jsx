import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { signupUser } from '../services/authServices'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
    name: yup.string().required("Please enter your Name!"),
    email: yup.string().email("Invalid Email! Please enter a valid email.").required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confimPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match.")
        .required('Confirm Password is required'),
})

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const onSubmit = async (data) => {
        try {
            const userDetails = {
                name: data?.name,
                email: data?.email,
                password: data?.password,
            };

            await signupUser(userDetails);
            toast.success("Account Created. Please proceed to login.")
        } catch (err) {
            console.error("SignUp failed: ", err.response?.data || err.message);
            toast.error(err.message)
        }
    }


    const [passVisibility, setPassVisibility] = useState({
        password: false,
        confimPassword: false
    });

    return (
        <div className='flex items-center justify-center min-h-screen px-4'>
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl  mt-14 border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text"
                            {...register("name")}
                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="John Doe" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email"
                            {...register("email")}
                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="you@example.com" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type={passVisibility.password ? "text" : "password"}
                            {...register("password")}
                            className="w-full mt-1 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="••••••••"
                        />
                        <span className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setPassVisibility(prev => ({ ...prev, password: !prev.password }))}>
                            <i className={passVisibility.password ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                        </span>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>


                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type={passVisibility.confimPassword ? "text" : "password"}
                            {...register("confimPassword")}
                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="••••••••" />
                        
                        <span className="absolute right-3 top-8 text-gray-500 cursor-pointer" onClick={() => setPassVisibility(prev => ({ ...prev, confimPassword: !prev.confimPassword }))}>
                            <i className={passVisibility.confimPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                        </span>
                        {errors.confimPassword && <p className="text-sm text-red-500">{errors.confimPassword.message}</p>}
                    </div>

                    <button type="submit"
                        className="w-full py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200">
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?
                    <Link to={'/login'} className="text-black font-medium hover:underline">Log in</Link>
                </p>
            </div>
        </div>

    )
}

export default SignUp