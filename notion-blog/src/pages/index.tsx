import { getAllPosts } from "../../lib/notionAPI";
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
    <div>
    </div>
  )
}
