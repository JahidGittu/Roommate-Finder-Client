import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import Loading from '../../Components/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Helmet } from 'react-helmet';
import { Zoom, Slide } from 'react-awesome-reveal';

const Login = () => {
    const { setUser, loginUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const MySwal = withReactContent(Swal);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Password Validation
        if (!/\d/.test(password)) return setError("Password must have at least 1 digit");
        if (!/[A-Z]/.test(password)) return setError("Password must have at least 1 uppercase letter");
        if (!/[a-z]/.test(password)) return setError("Password must have at least 1 lowercase letter");
        if (!/[^\w\s]/.test(password)) return setError("Password must have at least 1 special character");
        if (password.length < 6) return setError("Password must be at least 6 characters long");

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                MySwal.fire({
                    title: <strong>Login Successful!</strong>,
                    html: <i>Welcome back, {user.email}</i>,
                    icon: "success",
                    customClass: {
                        popup: 'custom-modal-bg'
                    }
                });
                setLoading(false)
                navigate(location.state || "/");
            })
            .catch(error => {
                console.error("Login error", error.message);
                setLoading(false);
                MySwal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error'
                });
            });
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        signInWithGoogle()
            .then(res => {
                const user = res.user;
                setUser(user);
                setLoading(false)
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
                setLoading(false);
                MySwal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex justify-center items-center px-4 md:px-8">
            <Helmet>
                <title>Login | Roommate Finder</title>
            </Helmet>

            <div className="w-full max-w-[400px]">
                <Zoom triggerOnce duration={600}>
                    <Slide direction="left" triggerOnce duration={800}>
                        <div className="card w-full bg-base-100 shadow-2xl border border-gray-500 px-6 py-4 md:px-10 md:py-6">
                            <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
                            <div className="card-body p-0">
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* Email */}
                                    <div>
                                        <label className="label">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="input w-full focus:outline-none focus:border-gray-600"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1 text-sm">
                                        <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                name="password"
                                                placeholder="password"
                                                required
                                                className="w-full px-4 py-3 rounded-md focus:outline-none border border-gray-600"
                                            />
                                            <span
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                            >
                                                {showPass ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                        <div className="flex justify-end text-xs dark:text-gray-600">
                                            <Link to="/forgot-password">Forgot Password?</Link>
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                    <button disabled={loading} className="btn btn-primary w-full">
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                    <p className="text-md text-center pt-2">
                                        Don't have an account?
                                        <Link to="/auth/signup" className="text-secondary"> Sign up</Link>
                                    </p>
                                </form>

                                <div className="divider my-6">OR</div>

                                <p className="text-primary text-center text-xl font-bold">Try Social Login</p>
                                <button
                                    onClick={handleGoogleLogin}
                                    className="btn btn-ghost w-full border border-[#e5e5e5] flex justify-center items-center gap-2 px-4 py-2 rounded-md mt-2"
                                >
                                    <FcGoogle className="text-xl" />
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    </Slide>
                </Zoom>
            </div>
        </div>
    );
};

export default Login;
