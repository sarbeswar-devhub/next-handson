"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import {useRouter} from "next/navigation"
import { useEffect } from "react"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address!"),
    password: z.string().min(2, "Password must be at least 2 characters!")
});

type loginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("access_token");

        if (token) {
            router.replace("/dashboard");
        }

    }, []);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema)
    });



    const onSubmit = async (data: loginFormData) => {
        console.log("Login clicked", data);

        try {

            const formData = new URLSearchParams();

            formData.append("username", data.email);
            formData.append("password", data.password);

            const url = `${apiUrl}/login`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            });

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                alert("Invalid credentials!");
                return
            }

            // set to cookies
            Cookies.set("access_token", result.access_token, {
                expires: 7
            });

            // redirect to dashboad
            router.replace("/dashboard");

        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome Back
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Login to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* <!-- Email --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                        </label>

                        <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* <!-- Password --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                        </label>

                        <input
                        type="password"
                        placeholder="Enter your( password"
                        {...register("password")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* <!-- Remember + Forgot --> */}
                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-gray-600">
                        <input type="checkbox" className="rounded" />
                        Remember me
                        </label>

                        <a href="#" className="text-blue-600 hover:underline">
                        Forgot password?
                        </a>
                    </div>

                    {/* <!-- Button --> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        {
                            isSubmitting ? "Loading..." : "Login"
                        }
                    </button>

                    </form>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?

                        <Link href="/register" className="text-blue-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}