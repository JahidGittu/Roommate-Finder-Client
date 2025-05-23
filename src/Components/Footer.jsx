import React from 'react';
import { FaFacebook, FaLinkedin, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                <Link to="/webinfo/aboutus" className="link link-hover">About us</Link>
                <Link to="/webinfo/contact" className="link link-hover">Contact</Link>
                <Link to="/webinfo/jobs" className="link link-hover">Jobs</Link>
                <Link to="/webinfo/presskit" className="link link-hover">Press kit</Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/Mohammad.Jahid.Hossen.fb" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/jahid-hossen-me/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaTelegram size={24} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={24} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} />
                    </a>

                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;