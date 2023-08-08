import { getAllPosts, getPostsFourTopPage, getPostByPage, getNumberOfPages, getPostsByTagAndPage, getNumberOfPagesByTag, getAllTags, } from "../../../../../../lib/notionAPI";
import Head from "next/head";
import SinglePost from "../../../../../../components/Post/SinglePost";
import Pagenation from "../../../../../../components/Pagenation/Pagenation";
import { GetStaticPaths, GetStaticProps } from "next";


export const getStaticPaths: GetStaticPaths = async () => {
    const allTags = await getAllTags();
    let params: any[] = [];

    await Promise.all(
        allTags.map((tag: string) => {
            return getNumberOfPagesByTag(tag).then((numberOfPageByTag: number) => {
                for (let i = 1; i <= numberOfPageByTag; i++) {
                    params.push({ params: { tag: tag, page: i.toString() } })
                }
            });
        })
    );


    return {
        paths: params,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const currentPage = context.params?.page?.toString();
    const currentTagName = context.params?.tag?.toString();
    const posts = await getPostsByTagAndPage(currentTagName!, parseInt(currentPage!.toString(), 10));

    const numberOfPagesByTag = await getNumberOfPagesByTag(currentTagName!);
    return {
        props: {
            posts: posts,
            numberOfPagesByTag: numberOfPagesByTag,
            currentTagName: currentTagName,
        },
        revalidate: 60,
    }
}

const BlogTagPageList = ({ posts, numberOfPagesByTag, currentTagName }: any) => {
    return (
        <div className="container h-full mx-auto font-mono">
            <Head>
                <title>Notion-Blog</title>
            </Head>

            <main className="container w-full mt-16">
                <h1 className="text-5xl font-semibold text-center mg-16 mb-16">Notion Blog🚀</h1>

                <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
                    {
                        posts.map((post: any) => (
                            <div key={post.id}>
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
                <Pagenation numberOfPage={numberOfPagesByTag} tag={currentTagName} />
            </main>
        </div>
    )
}

export default BlogTagPageList;
