import { Client } from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const n2m = new NotionToMarkdown({ notionClient: notion });

  export  const getAllPosts = async () =>{
    const posts = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      page_size:100,
    });

    const allPosts = posts.results;
    return allPosts.map((post)=>{
      return getPageMetaData(post);
    });
  };

  const getPageMetaData=(post:any)=>{

    const getTags =(tags:any)=>{
      const allTags = tags.map((tag:any)=>{
        return tag.name;
      });
      return allTags;
    };

    return{
      id: post.id,
      title: post.properties.名前.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      date: post.properties.Date.date.start,
      slug: post.properties.Slug.rich_text[0].plain_text,
      tags: getTags(post.properties.タグ.multi_select),
    };
  };

  export const getSinglePost = async (slug:string) =>{
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property:"Slug",
        formula:{
          string:{
            equals: slug,
          }
        }
      },
    });
    const page = response.results[0];
    const metadata = getPageMetaData(page);
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    console.log(mdString);
    return{
      metadata,
      markdown:mdString,
    }
  };

  export const getPostsFourTopPage = async (page_size:number)  =>{
    const allPosts = await getAllPosts();
    const fourPosts = allPosts.slice(0,page_size);
    return fourPosts;
  };
