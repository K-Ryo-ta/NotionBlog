import React from "react";
import Link from "next/link";
import { getPageLink } from "../../lib/blog-helpr";

interface Props {
    numberOfPage: number,
    tag: string,
}

const Pagenation = (props: Props) => {
    const { numberOfPage, tag } = props;
    let pages: number[] = [];
    for (let i = 1; i <= numberOfPage; i++) {
        pages.push(i);
    }
    return (
        <section className="mb-8 mx-auto lg:w-1/2 rounded-md p-5">
            <ul className="flex items-center justify-center gap-4">
                {pages.map((page) => (
                    <li className="bg-sky-900 w-6 h-8 rounded-lg relative shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all" key={page}>
                        <Link href={getPageLink(tag, page)} className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">{page}</Link>
                    </li>))}
            </ul>
        </section>
    );
};

export default Pagenation;
