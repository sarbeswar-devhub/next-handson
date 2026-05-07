"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const registerSchema = z.object({
    name: z.string().min(1, "Name field is required!"),
    email: z.string().min(1, "Email field is requied!").email("Invalid email address!"),
    phone: z.string()
        .min(10, "Phone number must be 10 digits!")
        .max(10, "Phone number must be 10 digits!")
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    address: z.string(),
    password: z.string().min(8, "Password must be 8 characters!"),
    confirm_password: z.string().min(8, "Password must be 8 characters!"),
    is_agree: z.boolean().refine((value) => value === true, "Must agree the terms & conditions!")
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"]
});

type registerFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();

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
    } = useForm({
        resolver: zodResolver(registerSchema)
    });


    const onSubmit = async (data: registerFormData) => {
        try {
            const url = `${apiUrl}/register`;
            
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log(result);

            if (!response.ok) {
                alert("Something went wrong!");
                return;
            }

            // redirect to login
            router.push("/login");

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

                    {/* <!-- Header --> */}
                    <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register to get started
                    </p>
                    </div>

                    {/* <!-- Form --> */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* <!-- Name --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                        </label>

                        <input
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.name && (
                            <p className="text-red-500 mt-1">{errors.name.message}</p>
                        )}

                    </div>

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
                            <p className="text-red-500 mt-1">{errors.email.message}</p>
                        )}

                    </div>

                    {/* <!-- Phone --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                        </label>

                        <input
                        type="number"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.phone && (
                            <p className="text-red-500 mt-1">{errors.phone.message}</p>
                        )}

                    </div>

                    {/* <!-- Address --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                        </label>

                        <textarea
                        placeholder="Enter your address"
                        {...register("address")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>

                        {errors.address && (
                            <p className="text-red-500 mt-1">{errors.address.message}</p>
                        )}

                    </div>

                    {/* <!-- Password --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                        </label>

                        <input
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.password && (
                            <p className="text-red-500 mt-1">{errors.password.message}</p>
                        )}

                    </div>

                    {/* <!-- Confirm Password --> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                        </label>

                        <input
                        type="password"
                        placeholder="Confirm password"
                        {...register("confirm_password")}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {errors.confirm_password && (
                            <p className="text-red-500 mt-1">{errors.confirm_password.message}</p>
                        )}

                    </div>

                    {/* <!-- Terms --> */}
                    <div className="text-sm text-gray-600">

                        <div className="flex items-start gap-2">
                            <input type="checkbox" {...register("is_agree")} className="mt-1 rounded" />
                            <p>
                                I agree to the
                                <a href="#" className="text-blue-600 hover:underline">
                                    Terms & Conditions
                                </a>
                            </p>
                        </div>
                        
                        {errors.is_agree && (
                            <p className="text-red-500 mt-1">{errors.is_agree.message}</p>
                        )}

                    </div>

                    {/* <!-- Submit --> */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        {
                            isSubmitting ? "Loading..." : "Create Account"
                        }
                    </button>

                    </form>

                    {/* <!-- Login --> */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?

                    <Link href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                    </p>

                </div>
            </div>
        </>
    )
}