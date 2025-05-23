import React, { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';
import useProfile from '../Provider/UserProfile';

const ContactUs = () => {

    const { user } = useContext(AuthContext)
    const { profileData } = useProfile()

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )

            .then(
                (result) => {
                    toast('🦄 Message sent successfully!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'light',
                        transition: Bounce,
                    });
                    form.current.reset();
                },
                (error) => {
                    toast.error('❌ Failed to send message. Please try again.');
                }
            );
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail} className="grid gap-4">
                <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    className="input input-bordered w-full bg-gray-700"
                    value={profileData.name || user?.displayName}
                    required
                />
                <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    className="input input-bordered w-full bg-gray-700"
                    value={user?.email}
                    required
                    readOnly
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    className="textarea textarea-bordered w-full h-32"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
