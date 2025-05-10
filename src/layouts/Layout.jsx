import React from 'react';
import Logout from '../components/Logout';
import { useAuth } from '../contexts/AuthContext';

const Layout = (props) => {
    const {isScrolledUnder} = useAuth();
    return (
        <div className='container mx-auto bg-gradient-to-b from-[#3B0D2D] via-[#172A36] to-[#160C24] px-5 py-5 min-h-screen'>
            <div className={`navbar sticky top-5 shadow-lg rounded-box z-[1] ${isScrolledUnder ? 'bg-[#ffffff4D] bg-opacity-[10] text-[#39102D]' : 'bg-transparent text-neutral-content'} `}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Computers</a></li>
                            <li><a>Accessories</a></li>
                            <li><a>Users</a></li>
                        </ul>
                    </div>
                    <a className=""><img  src="https://www.neoscoder.com/_next/image?url=%2Fimages%2Flogo%2Flogo_1.png&w=128&q=75" alt="Neoscoder" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Computers</a></li>
                        <li><a>Accessories</a></li>
                        <li><a>Users</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Logout/>
                </div>
            </div>

            {props.children}
            {/* Footer */}
            <footer className="footer footer-center bg-base-100 text-base-content rounded p-2">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Neoscoder Ltd</p>
                </aside>
            </footer>
            
        </div>
    );
};

export default Layout;