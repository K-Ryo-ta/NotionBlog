import React from "react";
import Link from "next/link";

const Tag = () => {
    return (
        <div className="mx-4">
            <section className="lg:w-1/2 mb-8 mx-auto bg-orange-200 rounded-md p-5">
                <div className="font-semibold mb-4">
                    タグ検索
                </div>
                <div className="flex flex-wrap gap-5">
                    <Link href={"/post/tag/blog/page/1"}>
                        <span className="cursor-pointer px-2  pb-1 rounded-xl bg-gray-400 inline-block shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
                            Blog
                        </span>
                    </Link>
                    <Link href={"/post/tag/blog/page/1"}>
                        <span className="cursor-pointer px-2  pb-1 rounded-xl bg-gray-400 inline-block shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
                            TypeScript
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Tag;
