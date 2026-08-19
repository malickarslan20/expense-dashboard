import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/Authlayout";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipath";
import { UserContext } from "../../context/UserContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    // Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError(" ") // Clear previous error
        setIsLoading(true);

        //login API call

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, ...user } = response.data;
            console.log("Login Response:", { token, user });
            if (token) {
                localStorage.setItem("token", token);
                console.log(user);
                updateUser(user);
                navigate("/dashboard");
            }

        } catch (error) {
             console.log("Login Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred during login. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout>
            <div className="w-full px-4 sm:px-6 lg:w-[70%] lg:px-0 h-auto lg:h-full flex flex-col justify-center py-8 lg:py-0">
                <h3 className="text-lg sm:text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Logging In...
                            </>
                        ) : (
                            "Log In"
                        )}
                    </button>

                    <p className="text-sm text-slate-700 mt-4 text-center sm:text-left">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline focus:outline-none"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </p>

                </form>
            </div>
        </AuthLayout>
    );
}

export default Login;