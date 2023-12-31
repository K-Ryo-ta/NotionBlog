import { getAllPosts, getAllTags, getPostsFourTopPage } from "../../lib/notionAPI";
import Head from "next/head";
import SinglePost from "../../components/Post/SinglePost"
import { GetStaticProps } from "next";
import Link from "next/link";
import Tag from "../../components/Tag/Tag"

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsFourTopPage(4);
  const allTags = await getAllTags();

  return {
    props: {
      fourPosts: fourPosts,
      allTags: allTags,
    },
    revalidate: 10,
  }
}

export default function Home({ fourPosts, allTags }: any) {
  return (
    <div className="container h-full mx-auto font-mono">
      <Head>
        <title>Notion-Blog</title>
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-semibold text-center mg-16 mb-16">Notion Blog🚀</h1>

        {
          fourPosts.map((post: any) => (
            <div className="mx-4" key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPagenationPage={false}
              />
            </div>
          ))
        }
        <Link href="/post/page/1" className="block lg:w-1/2 justify-end mx-auto text-right">
          <p className="inline-block  mb-6  rounded-md p-2 shadow-2xl hover:shadow-none hover:translate-y-2 transition-all duration-300 text-gray-100 bg-sky-700 font-semibold ">
            ...もっと見る
          </p>
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  )
}
