import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import Loading from '../../Components/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Login = () => {
    const { setUser, loginUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext)
    const [error, setError] = useState('');
    const MySwal = withReactContent(Swal)

    const [showPass, setShowPass] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Password Validation
        if (!/\d/.test(password)) {
            setError("Password must have at least 1 digit");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must have at least 1 uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must have at least 1 lowercase letter");
            return;
        }
        if (!/[^\w\s]/.test(password)) {
            setError("Password must have at least 1 special character");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }


        // Login User

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                MySwal.fire({
                    title: <strong>Login Successful!</strong>,
                    html: <i>Welcome back, {user.email}</i>,
                    icon: "success",
                    customClass: {
                        popup: 'custom-modal-bg'
                    }
                });


                navigate(location.state || "/");
            })
            .catch(error => {
                console.error("Login error", error.message);
                MySwal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });

    };


    const handleGoogleLogin = () => {
        setLoading(true);
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                setUser(user);
                MySwal.fire({
                    title: <strong>Login Successful!</strong>,
                    html: <i>Welcome back, {user.email}</i>,
                    icon: "success",
                    customClass: {
                        popup: 'custom-modal-bg'
                    }
                });
                navigate(location.state?.from?.pathname || "/");
            })
            .catch(error => {
                console.error("Google login error", error.message);
                MySwal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <Loading />
    }


    return (

        <div>
            <div className="flex items-center justify-center min-h-screen p-4 ">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md border border-gray-500">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="email" className="block dark:text-gray-300">Email</label>
                            <input type="email" name="email" placeholder="xyz@email.com" required className="w-full px-4 py-3 rounded-md focus:outline-none border border-gray-600" />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-300">Password</label>
                            <div className='relative'>
                                <input type={`${showPass ? 'text' : 'password'}`} name="password" placeholder="password" required className="w-full px-4 py-3 rounded-md focus:outline-none border border-gray-600" />
                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </span>

                            </div>
                            <div className="flex justify-end text-xs dark:text-gray-600">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>

                        {
                            error && <p className="text-red-500 text-sm text-center">{error}</p>
                        }

                        <button disabled={loading} className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 cursor-pointer">
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        {/* Google */}
                        <button onClick={handleGoogleLogin} className="btn btn-ghost border border-[#e5e5e5] flex items-center gap-2 px-4 py-2 rounded-md">
                            <FcGoogle className="text-xl" />
                            Login with Google
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                        <Link to="/auth/signup" className="underline text-secondary ">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;