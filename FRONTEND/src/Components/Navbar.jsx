import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    // const handleMyTasks = () => {
    //     navigate(isLoggedIn ? '/dashboard' : '/login');
    //     setIsMobileMenuOpen(false);
    // };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition duration-300">
                    Task Manager
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="hover:text-blue-200 transition duration-300">
                        Home
                    </Link>
                    <Link to="/contact" className="hover:text-blue-200 transition duration-300">
                        Contact
                    </Link>
                   
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200 transition duration-300">
                                Dashboard
                            </Link>
                            <button  onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300" >  Logout </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200 transition duration-300">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-blue-200 transition duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-2xl hover:text-blue-200 transition duration-300" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-r from-blue-700 to-indigo-700 py-4 transform transition-all duration-300 ease-in-out">
                    <div className="container mx-auto px-4 flex flex-col space-y-4">
                        <Link  to="/"  className="hover:text-blue-200 transition duration-300"  onClick={toggleMobileMenu} >
                            Home
                        </Link>
                        <Link to="/contact" className="hover:text-blue-200 transition duration-300" onClick={toggleMobileMenu} >
                            Contact
                        </Link>
                        {/* <button onClick={handleMyTasks}  className="text-left hover:text-blue-200 transition duration-300" > My Tasks
                        </button> */}
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="hover:text-blue-200 transition duration-300" onClick={toggleMobileMenu} > Dashboard
                                </Link>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-left transition duration-300" > Logout </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-200 transition duration-300" onClick={toggleMobileMenu} > Login
                                </Link>
                                <Link to="/register" className="hover:text-blue-200 transition duration-300"
                                    onClick={toggleMobileMenu} > Register </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;