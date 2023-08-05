import React from "react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
}

const SinglePost = (props: Props) => {
    const { title, description, date, tags, slug } = props;
    return (
        <>
            <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-2 transition-all duration-300">
                <div className="gap-3">
                    <h2 className="text-gray-100 text-2xl font-semibold">
                        <Link href={`/post/${slug}`}>
                            {title}
                        </Link>
                    </h2>
                    <div className="text-gray-100">
                        {date}
                    </div>
                    {tags.map((tag) => (
                        <span className="text-gray-100 bg-gray-500 rounded-xl px-2 pb-1  mx-1 font-semibold">
                            {tag}
                        </span>
                    ))}

                </div>
                <p className="text-gray-100">
                    {description}
                </p>
            </section>
        </>

    )
};

export default SinglePost;
