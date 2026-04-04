import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import logo from "../../media/logo_.png";

export default function Navbar() {
  const { user } = useAuth();

  const iconButtonClass = "rounded-xl border border-transparent p-1.5 transition duration-200 hover:border-herb-200 hover:bg-herb-100";

  const navItemClass = ({ isActive }) =>
    `relative whitespace-nowrap px-1 py-1.5 text-sm font-semibold tracking-tight transition duration-200 ${
      isActive ? "text-herb-700 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-herb-700" : "text-herb-900 hover:text-herb-700"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-herb-200/40 bg-herb-50/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-3 px-3 md:gap-6 md:px-8 lg:px-10">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center rounded-xl bg-herb-100/80 px-2 py-1"
          aria-label="Tapai Ko Sathi Home"
        >
          <img
            src={logo}
            alt="Tapai Ko Sathi"
            className="h-10 w-auto object-contain mix-blend-multiply md:h-11"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 md:flex lg:gap-8">
          <NavLink to="/" className={navItemClass}>Home</NavLink>
          <NavLink to="/products" className={navItemClass}>Categories</NavLink>
          <NavLink to="/profile" className={navItemClass}>Orders</NavLink>
          <NavLink to="/products" className={navItemClass}>Wishlist</NavLink>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 text-herb-900 md:gap-2">
          <NavLink to="/cart" className={iconButtonClass} aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l1.2 6.3a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L19 6H7" />
              <circle cx="10" cy="19" r="1.5" />
              <circle cx="17" cy="19" r="1.5" />
            </svg>
          </NavLink>
          <NavLink to={user ? "/profile" : "/auth"} className={iconButtonClass} aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-4 w-4">
              <circle cx="12" cy="8" r="3.2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a7 7 0 0 1 14 0" />
            </svg>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
