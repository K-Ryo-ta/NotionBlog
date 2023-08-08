import React from "react";
import Link from "next/link";

type Props = {
    tags: string[]
}

const Tag = (props: Props) => {
    const { tags } = props;

    return (
        <div className="mx-4">
            <section className="lg:w-1/2 mb-8 mx-auto bg-orange-200 rounded-md p-5">
                <div className="font-semibold mb-4">
                    タグ検索
                </div>
                <div className="flex flex-wrap gap-5">
                    {tags.map((tag: string, index: number) => (<Link href={`/post/tag/${tag}/page/1`} key={index}>
                        <span className="cursor-pointer px-2  pb-1 rounded-xl bg-gray-400 inline-block shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all">
                            {tag}
                        </span>
                    </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Tag;
