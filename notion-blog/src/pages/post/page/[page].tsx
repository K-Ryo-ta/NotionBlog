import { getAllPosts, getPostsFourTopPage, getPostByPage, getNumberOfPages } from "../../../../lib/notionAPI";
import Head from "next/head";
import SinglePost from "../../../../components/Post/SinglePost";
import Pagenation from "../../../../components/Pagenation/Pagenation";
import { GetStaticPaths, GetStaticProps } from "next";


export const getStaticPaths: GetStaticPaths = async () => {
    const numberOfPage = await getNumberOfPages();
    let params = [];
    for (let i = 1; i <= numberOfPage; i++) {
        params.push({ params: { page: i.toString() } })
    }
    return {
        paths: params,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const currentPage = context.params?.page;
    const postsByPage = await getPostByPage(parseInt(currentPage!.toString(), 10));

    return {
        props: {
            postsByPage: postsByPage,
        },
        revalidate: 60,
    }
}

const BlogPageList = ({ postsByPage }: any) => {
    return (
        <div className="container h-full mx-auto font-mono">
            <Head>
                <title>Notion-Blog</title>
            </Head>

            <main className="container w-full mt-16">
                <h1 className="text-5xl font-semibold text-center mg-16 mb-16">Notion Blog🚀</h1>

                <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
                    {
                        postsByPage.map((post: any) => (
                            <div >
                                <SinglePost
                                    title={post.title}
                                    description={post.description}
                                    date={post.date}
                                    tags={post.tags}
                                    slug={post.slug}
                                    isPagenationPage={true}
                                />
                            </div>
                        ))
                    }
                </section>
                <Pagenation />
            </main>
        </div>
    )
}

export default BlogPageList;
