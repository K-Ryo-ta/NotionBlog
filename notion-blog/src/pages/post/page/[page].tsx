import { getAllPosts, getPostsFourTopPage } from "../../../../lib/notionAPI";
import Head from "next/head";
import SinglePost from "../../../../components/Post/SinglePost"
import { GetStaticPaths, GetStaticProps } from "next";


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    page: '1',
                },
            },
        ],
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async () => {
    const fourPosts = await getPostsFourTopPage(4);

    return {
        props: {
            fourPosts: fourPosts,
        },
        revalidate: 60,
    }
}

const BlogPageList = ({ fourPosts }: any) => {
    return (
        <div className="container h-full mx-auto font-mono">
            <Head>
                <title>Notion-Blog</title>
            </Head>

            <main className="container w-full mt-16">
                <h1 className="text-5xl font-semibold text-center mg-16 mb-16">Notion Blog🚀</h1>
            </main>
            {
                fourPosts.map((post: any) => (
                    <div className="mx-4">
                        <SinglePost
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            tags={post.tags}
                            slug={post.slug}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default BlogPageList;
