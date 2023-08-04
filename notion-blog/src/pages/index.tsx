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
  console.log(allPosts);
  return (
    <div className="container h-full mx-auto font-mono">
      <Head>
        <title>Notion-Blog</title>
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mg-16">Notion Blog🚀</h1>
      </main>
      {
        allPosts.map((post: any) => (
          <div className="mx-4">
            <SinglePost
              title={post.title}
              desciption={post.desciption}
              date={post.date}
              tag={post.tags}
              slug={post.slug}
            />
          </div>
        ))
      }
    </div>
  )
}
