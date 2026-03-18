import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";

import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogoutUser = () => {
    logoutUser();
    navigate("/login");
  };

  const navigationLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "Deals", href: "/deals" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <FiShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">PhiMart</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="hidden sm:block">
              {isSearchOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm w-32"
                  />
                  <FiSearch className="ml-2 text-gray-500" />
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiSearch />
                </button>
              )}
            </div>


            {/* User */}
            {user ? (
              <>
              {/* Cart */}
              <Link
                to="/dashboard/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <FiShoppingCart className="text-lg" />
                {cart?.items?.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Link>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <FiUser />
                </div>

                <ul className="menu menu-sm dropdown-content bg-base-100 mt-3 w-40 p-2 shadow rounded-box">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogoutUser}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="space-y-2 pt-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;