import React from "react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
    isPagenationPage: boolean;
}

const SinglePost = (props: Props) => {
    const { title, description, date, tags, slug, isPagenationPage } = props;
    return (
        <>
            {isPagenationPage ? (
                <section className="bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-2 transition-all duration-300">
                    <div className="gap-3">
                        <h2 className="text-gray-100 text-2xl font-semibold">
                            <Link href={`/post/${slug}`}>
                                {title}
                            </Link>
                        </h2>
                        <div className="text-gray-400">
                            {date}
                        </div>
                        <div className="flex flex-wrap">
                            {tags.map((tag: string, index: number) => (
                                <Link href={`/post/tag/${tag}/page/1`}>
                                    <span className="text-gray-100 bg-gray-500 rounded-xl px-2 pb-1 mb-1 mr-3 font-semibold hover:text-blue-600 transition-all duration-300" key={index}>
                                        {tag}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-100">
                        {description}
                    </p>
                </section>
            ) : (
                <section className="lg:w-1/2 bg-sky-900 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-2 transition-all duration-300">
                    <div className="gap-3">
                        <h2 className="text-gray-100 text-2xl font-semibold">
                            <Link href={`/post/${slug}`}>
                                {title}
                            </Link>
                        </h2>
                        <div className="text-gray-400">
                            {date}
                        </div>
                        <div className="flex flex-wrap">
                            {tags.map((tag: string, index: number) => (
                                <Link href={`/post/tag/${tag}/page/1`}>
                                    <span className="text-gray-100 bg-gray-500 rounded-xl px-2 pb-1 mb-1 mr-3 font-semibold hover:text-blue-400 transition-all duration-300" key={index}>
                                        {tag}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-100">
                        {description}
                    </p>
                </section>
            )}
        </>

    )
};

export default SinglePost;
