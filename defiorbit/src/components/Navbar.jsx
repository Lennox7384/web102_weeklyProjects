import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-cosmic p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-starlight">
          DeFiOrbit
        </Link>
        {/* Hamburger Icon for Mobile */}
        <button
          className="text-starlight md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Links/Buttons */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-cosmic md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-4 z-10`}
        >
          {user ? (
            <>
              <span className="text-starlight text-sm sm:text-base">Welcome, {user.email}</span>
              <button onClick={handleLogout} className="btn-nebula">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-starlight hover:text-nebula text-sm sm:text-base">
                Login
              </Link>
              <Link to="/signup" className="text-starlight hover:text-nebula text-sm sm:text-base">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}