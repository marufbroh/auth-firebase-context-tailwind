import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/authProviders';

const Header = () => {
    const { user, letMeSignOut } = useContext(UserContext)

    const handleSignOut = () => {
        letMeSignOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    return (
        <div className="bg-primary">
            <nav className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <Link to={"/"} className="text-white text-xl font-bold">Auth Master</Link>
                    <ul className="flex space-x-4">
                        <li className="text-white hover:text-gray-200 cursor-pointer">
                            <Link to="/">Home</Link>
                        </li>
                        {user && <li className="text-white hover:text-gray-200 cursor-pointer">
                            <Link to="/profile">Profile</Link>
                        </li>}
                        {user && <li className="text-white hover:text-gray-200 cursor-pointer">
                            <Link to="/oders">Oders</Link>
                        </li>}
                        {!user && <li className="text-white hover:text-gray-200 cursor-pointer">
                            <Link to="/login">Login</Link>
                        </li>}
                        {!user && <li className="text-white hover:text-gray-200 cursor-pointer">
                            <Link to="/register">Register</Link>
                        </li>}
                        {
                            user && <>
                                <span className='text-white hover:text-gray-200 cursor-pointer'>{user.email}</span>
                                <button onClick={handleSignOut} className="btn btn-sm">Sign Out</button>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;