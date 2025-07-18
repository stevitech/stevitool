import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();
    const timeoutRef = useRef(null);

    const isActive = (path) => location.pathname === path;
    const isServicesActive = location.pathname.startsWith("/services");

    const baseLink =
        "cursor-pointer transition hover:text-[hsl(var(--color-primary))]";
    const activeLink = "text-[hsl(var(--color-primary))] font-semibold";

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150); // short delay to allow cursor to reach submenu
    };

    return (
        <nav className="w-full px-10 py-4 flex items-center justify-between backdrop-blur-md shadow-md fixed top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-xl font-semibold cursor-pointer">
                Stevi<span className="text-[hsl(var(--color-primary))]">Tools</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link
                    to="/"
                    className={`${baseLink} ${isActive("/") ? activeLink : ""}`}
                >
                    Home
                </Link>

                {/* Dropdown */}
                <div
                    className="relative group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className={`flex items-center gap-1 ${baseLink} ${
                            isServicesActive ? activeLink : ""
                        }`}
                    >
                        <span>Services</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 14l-6-6h12l-6 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {/* Dropdown Panel */}
                    <div
                        className={`absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-[hsl(var(--color-glass))] backdrop-blur-md text-[hsl(var(--color-text))] transition-all duration-300 animate__animated z-[60] ${
                            isDropdownOpen ? "block animate__fadeInDown" : "hidden"
                        }`}
                    >
                        <Link
                            to="/services/link1"
                            className={`block px-4 py-2 cursor-pointer hover:text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-muted))]/0.2 ${
                                isActive("/services/link1") ? activeLink : ""
                            }`}
                        >
                            Link 1
                        </Link>
                        <Link
                            to="/services/link2"
                            className={`block px-4 py-2 cursor-pointer hover:text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-muted))]/0.2 ${
                                isActive("/services/link2") ? activeLink : ""
                            }`}
                        >
                            Link 2
                        </Link>
                        <Link
                            to="/services/link3"
                            className={`block px-4 py-2 cursor-pointer hover:text-[hsl(var(--color-primary))] hover:bg-[hsl(var(--color-muted))]/0.2 ${
                                isActive("/services/link3") ? activeLink : ""
                            }`}
                        >
                            Link 3
                        </Link>
                    </div>
                </div>

                <Link
                    to="/contact"
                    className={`${baseLink} ${
                        isActive("/contact") ? activeLink : ""
                    }`}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}
