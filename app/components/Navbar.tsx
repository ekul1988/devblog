import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = "transition hover:text-blue-400";
  const active = "font-semibold text-blue-400";
  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaLaptopCode className="text-blue-400 text-xl" /> Developer
        </NavLink>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              className={({ isActive }) => (isActive ? base : active)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? base : active)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? base : active)}
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? base : active)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? base : active)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
        {/* Mobile Nav Open Close Button*/}
        <div className="md:hiddent flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-400 text-xl cursor-pointer"
            title="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile Nav Open Close Button*/}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 space-y-2 space-x-4 text-center">
          <NavLink
            className={({ isActive }) => (isActive ? base : active)}
            to="/"  onClick={() => setMenuOpen(!menuOpen)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? base : active)}
            to="/projects"  onClick={() => setMenuOpen(!menuOpen)}
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? base : active)}
            to="/blog"  onClick={() => setMenuOpen(!menuOpen)}
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? base : active)}
            to="/about"  onClick={() => setMenuOpen(!menuOpen)}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? base : active)}
            to="/contact"  onClick={() => setMenuOpen(!menuOpen)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
