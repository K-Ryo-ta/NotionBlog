import { Client } from "@notionhq/client";
import {NotionToMarkdown} from "notion-to-md";
import { NUMBER_OF_POST_PER_RAGE } from "../constants/constants";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const n2m = new NotionToMarkdown({ notionClient: notion });

  export  const getAllPosts = async () =>{
    const posts = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      page_size:100,
      filter:{
        property:"Published",
        checkbox:{
          equals:true,
        },
      },
      sorts:[
        {
          property:"Date",
          direction:"descending",
        },
      ],
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

  export const getPostByPage = async(page:number) => {
    const allPosts = await getAllPosts();
    const startIndex = (page - 1) * NUMBER_OF_POST_PER_RAGE;
    const endIndex = startIndex + NUMBER_OF_POST_PER_RAGE;
    return allPosts.slice(startIndex,endIndex);
  }

  export const getNumberOfPages = async () => {
    const allPosts = await getAllPosts();
    return(
      Math.floor(allPosts.length/NUMBER_OF_POST_PER_RAGE) + (allPosts.length % NUMBER_OF_POST_PER_RAGE > 0 ? 1 : 0)
    )
  }

  export const getPostsByTagAndPage= async(tagName:string,page:number)=>{
    const allPosts = await getAllPosts();
    const posts =  allPosts.filter((post)=>post.tags.find((tag:string) => tag == tagName));

    const startIndex = (page - 1) * NUMBER_OF_POST_PER_RAGE;
    const endIndex = startIndex + NUMBER_OF_POST_PER_RAGE;
    return posts.slice(startIndex,endIndex);
  }

  export const getNumberOfPagesByTag = async (tagName:string) =>{
    const allPosts = await getAllPosts();
    const posts =  allPosts.filter((post)=>post.tags.find((tag:string) => tag == tagName));
    return(
      Math.floor(posts.length/NUMBER_OF_POST_PER_RAGE) + (posts.length % NUMBER_OF_POST_PER_RAGE > 0 ? 1 : 0)
    )
  }

  export const getAllTags = async ()=>{
    const allPosts = await getAllPosts();
    const allTagsDuplicationList =  allPosts.flatMap((post)=>post.tags);
    const set = new Set(allTagsDuplicationList);
    const allTagsList = Array.from(set);
    return allTagsList;
  }
