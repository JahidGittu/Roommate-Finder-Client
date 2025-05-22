import React, { useContext, useState } from 'react';

import { Link, useLocation } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../Components/Loading';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Signup = () => {
    const MySwal = withReactContent(Swal);


    const { loading, setLoading, setUser, createUser, updateUser, signInWithGoogle } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value

        // Digit check
        if (!/\d/.test(password)) {
            setError("Password must have at least 1 digit");
            return;
        }

        // Uppercase letter check
        if (!/[A-Z]/.test(password)) {
            setError("Password must have at least 1 uppercase letter");
            return;
        }

        // Lowercase letter check
        if (!/[a-z]/.test(password)) {
            setError("Password must have at least 1 lowercase letter");
            return;
        }

        // Special character check
        if (!/[^\w\s]/.test(password)) {
            setError("Password must have at least 1 special character");
            return;
        }

        // Minimum length check
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }


        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser({
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        setLoading(false);
                        MySwal.fire({
                            title: <strong>Registration Successful!</strong>,
                            html: <i>Welcome, {name}</i>,
                            icon: 'success',
                            customClass: {
                                popup: 'custom-modal-bg'
                            }
                        });

                        navigate(location.state || "/");
                    })
                    .catch(error => {
                        setError(error.message);
                        setLoading(false)
                        MySwal.fire({
                            title: 'Update Failed',
                            text: error.message,
                            icon: 'error'
                        });

                    });
            })
            .catch(error => {
                setError(error.message);
                setLoading(false)
                MySwal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error'
                });

            });


    }

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
                setLoading(false)
                MySwal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            })
            
    };



    if (loading) {
        return <Loading />
    }

    return (
        <div className='min-h-screen flex justify-center items-center '>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl -mt-16 border border-gray-500">
                <h2 className='text-2xl text-center font-bold pt-4'>Register Now!</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="fieldset">

                        {/* Name */}
                        <label className="label">Name</label>
                        <input name='name' type="text" className="input focus:outline-none focus:border-gray-600" placeholder="Name" required />

                        {/* Photo */}
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input focus:outline-none focus:border-gray-600" placeholder="Photo URL" required />
                        {/* Email */}
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input focus:outline-none focus:border-gray-600" placeholder="Email" required />
                        {/* Password */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <div className='relative'>
                                <input type={showPass ? 'text' : 'password'} name="password" placeholder="password" required className="w-full px-4 py-3 rounded-md focus:outline-none border border-gray-600" />
                                <span
                                    onClick={() => setShowPass(!showPass)}
                                    className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {
                            error && <p className='text-secondary'>{error}</p>
                        }

                        {/* Submit */}
                        <button className="btn btn-primary mt-4">Register</button>
                        <p className='text-md text-center pt-4'>Already have Account?
                            <Link to="/auth/login" className='text-secondary'>Login!</Link></p>
                    </form>

                    <div className='divider'>OR</div>

                    <p className='text-primary text-center text-xl font-bold'>Try Social Login</p>
                    <button onClick={handleGoogleLogin} className="btn btn-ghost border border-[#e5e5e5] flex items-center gap-2 px-4 py-2 rounded-md">
                        <FcGoogle className="text-xl" />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;