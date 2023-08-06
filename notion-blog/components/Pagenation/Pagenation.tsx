import React from "react";
import Link from "next/link";

const Pagenation = () => {
    return (
        <section className="mb-8 mx-auto lg:w-1/2 rounded-md p-5">
            <ul className="flex items-center justify-center gap-4">
                <li className="bg-sky-900 w-6 h-8 rounded-lg relative">
                    <Link href="post/page/1" className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">1</Link>
                </li>
                <li className="bg-sky-900 w-6 h-8 rounded-lg relative">
                    <Link href="post/page/1" className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">2</Link>
                </li>
                <li className="bg-sky-900 w-6 h-8 rounded-lg relative">
                    <Link href="post/page/1" className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">3</Link>
                </li>
            </ul>
        </section>
    );
};

export default Pagenation;
