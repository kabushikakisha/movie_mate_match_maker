
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function LoginPage() {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {

    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (

        <div className="flex min-h-[80vh] items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={email}
                            onChange={changeEmail}
                            placeholder="you@example.com"
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={password}
                            onChange={changePassword}
                            placeholder="********"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full justify-center rounded-md border-b-2 border-transparent px-3 py-2 text-lg font-medium text-white shadow-sm transition duration-150 ease-in-out"
                        style={{ backgroundColor: '#4f46e5' }}
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
}