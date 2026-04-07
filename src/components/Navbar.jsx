import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();

  const [featureOpen, setFeatureOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const featureRef = useRef();
  const profileRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        featureRef.current &&
        !featureRef.current.contains(e.target)
      ) {
        setFeatureOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-black text-white px-8 flex items-center justify-between z-50">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-red-500">ELITEFORM</h1>

      {/* CENTER NAV */}
      <ul className="flex items-center space-x-6">

        <li>
          <Link to="/">Home</Link>
        </li>

        {/* FEATURES DROPDOWN (CLICK BASED) */}
        <li className="relative" ref={featureRef}>
          <span
            className="cursor-pointer px-2 py-1"
            onClick={() => setFeatureOpen(!featureOpen)}
          >
            Features ▾
          </span>

          {featureOpen && (
            <ul className="absolute left-0 top-full mt-2 bg-gray-900 rounded-lg shadow-lg p-3 space-y-2 w-44 z-50">
              <li><Link to="/trainers">Trainers</Link></li>
              <li><Link to="/plans">Plans</Link></li>
              <li><Link to="/calories">Calories</Link></li>
              <li><Link to="/planner">Planner</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/competitions">Competitions</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-4">

        {user ? (
          <div className="relative" ref={profileRef}>

            {/* PROFILE ICON */}
            <FaUserCircle
              size={30}
              className="cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {/* PROFILE DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-gray-900 rounded-lg shadow-lg w-48 p-3 space-y-2 z-50">

                {/* Email (truncated nicely) */}
                <p className="text-sm text-gray-400 truncate">
                  {user.email}
                </p>

                <Link
                  to="/dashboard"
                  className="block hover:text-red-400"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left hover:text-red-400"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;