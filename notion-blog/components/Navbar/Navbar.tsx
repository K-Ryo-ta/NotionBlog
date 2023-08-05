import React from "react";
import Link from "next/link";
const Navbar = () => {
    return (
        <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
            <div className="container flex items-center justify-between mx-auto">
                <Link href="/" className="text-2xl font-semibold">
                    Ryota
                </Link>
                <div>
                    <ul className="flex items-center text-sm py-4">
                        <li>
                            <Link href="/" className="block px-2 py-2 hover:text-orange-600 transition-all duration-300 font-semibold bg-gray-300 rounded-md shadow-2xl hover:shadow-none hover:translate-y-0.5 mx-1">Home</Link>
                        </li>
                        <li>
                            <Link href="https://twitter.com/KR_programing" className="block px-2 py-2 hover:text-sky-600 transition-all duration-300 font-semibold bg-gray-300 rounded-md shadow-2xl hover:shadow-none hover:translate-y-0.5 mx-1">Twitter</Link>
                        </li>
                        <li>
                            <Link href="https://qiita.com/Ryota_programing" className="block px-2 py-2 hover:text-green-600 transition-all duration-300 font-semibold bg-gray-300 rounded-md shadow-2xl hover:shadow-none hover:translate-y-0.5 mx-1">Qiita</Link>
                        </li>
                        <li>
                            <Link href="https://github.com/K-Ryo-ta" className="block px-2 py-2 hover:text-indigo-600 transition-all duration-300 font-semibold bg-gray-300 rounded-md shadow-2xl hover:shadow-none hover:translate-y-0.5 mx-1">GitHub</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
