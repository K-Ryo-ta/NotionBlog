import { getAllPosts } from "../../lib/notionAPI";
import Head from "next/head";
import SinglePost from "../../components/Post/SinglePost"

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts: allPosts,
    },
    revalidate: 60,
  }
}

export default function Home({ allPosts }: any) {
  return (
    <div className="container h-full mx-auto font-mono">
      <Head>
        <title>Notion-Blog</title>
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-semibold text-center mg-16 mb-16">Notion Blog🚀</h1>
      </main>
      {
        allPosts.map((post: any) => (
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
