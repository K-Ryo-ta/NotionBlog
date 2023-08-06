import React from "react";
import Link from "next/link";

interface Props {
    numberOfPage: number,
}

const Pagenation = (props: Props) => {
    const { numberOfPage } = props;
    let pages: number[] = [];
    for (let i = 1; i <= numberOfPage; i++) {
        pages.push(i);
    }
    console.log(pages);
    return (
        <section className="mb-8 mx-auto lg:w-1/2 rounded-md p-5">
            <ul className="flex items-center justify-center gap-4">
                {pages.map((page) => (
                    <li className="bg-sky-900 w-6 h-8 rounded-lg relative">
                        <Link href="post/page/1" className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-100">{page}</Link>
                    </li>))}
            </ul>
        </section>
    );
};

export default Pagenation;
