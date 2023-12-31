import React from "react";
import { getSinglePost, getAllPosts } from "../../../lib/notionAPI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Link from "next/link";

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts();
    const paths = allPosts.map((slug) => ({ params: { slug: slug.slug } }))
    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps = async ({ params }: any) => {
    const post = await getSinglePost(params.slug);
    return {
        props: {
            post: post,
        },
        revalidate: 10,
    }
}

const Post = ({ post }: any) => {
    return (
        <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
            <h2 className="w-full text-2xl font-semibold">
                {post.metadata.title}
            </h2>
            <div className="border-b-2 w-full mt-1 border-sky-900">
            </div>
            <span className="text-gray-500">
                Posted dated at {post.metadata.date}
            </span>
            <br />
            {post.metadata.tags.map((tag: string, index: number) => (
                <Link href={`/post/tag/${tag}/page/1`}>
                    <p className="text-white bg-sky-900 rounded-xl font-semibold mt-2 px-2 inline-block mr-2 hover:text-blue-400 transition-all duration-300 shadow-2xl hover:shadow-none hover:translate-y-0.5" key={index}>
                        {tag}
                    </p>
                </Link>

            ))}

            <div className="mt-10 font-semibold">
                <ReactMarkdown components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={prism}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}>
                    {post.markdown.parent}
                </ReactMarkdown>
            </div>

            <Link href="/">
                <span className="block px-2 py-2 hover:text-orange-600 transition-all duration-300 font-semibold bg-gray-300 rounded-md shadow-2xl hover:shadow-none hover:translate-y-0.5 inline-block">
                    ホームに戻る
                </span>
            </Link>
            <div>
                <br />
            </div>
        </section>
    );
};



export default Post;
