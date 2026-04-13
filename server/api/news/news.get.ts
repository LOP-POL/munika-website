import { Client } from "@notionhq/client"
import { NewsCollectionItem } from "@nuxt/content"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const notionApiKey = config.notionApiKey
    const notionNewsPage = config.notionNewsPage

    if (!notionApiKey) {
        throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
    }

    const notion = new Client({
        auth: notionApiKey,
    })

    // Query all news
    const response = await notion.databases.query({
        database_id: notionNewsPage,
    })

    // query the news from the markdown files
    // const posts = await queryCollection(event,"News").limit(10).all()

    // Extract relevant info from each page
    function extractNews(page: any) {
        const props = page.properties
        return {
            id: props.ID?.title?.[0]?.plain_text ?? "",
            title: props.Title?.rich_text?.[0]?.plain_text ?? "",
            content: props.Content?.rich_text?.[0]?.plain_text ?? "",
            date: props.Date?.date?.start ?? "",
            author: props.Author?.people?.[0]?.name ?? "",
            type: props.Type?.multi_select?.[0]?.name ?? "",
            postUrl: props.PostURL?.url ?? "",
        }
    }
    // function extractNewsFromCollection(res:NewsCollectionItem){
    //     return { 
    //         id:res.id,
    //         title:res.title,
    //         content:res.content,
    //         date:res.date,
    //         author:res.author,
    //         type:res.type,
    //         postUrl:res.path
    //     }
    // }
    // response.results.map(extractNews).concat(posts.map(extractNewsFromCollection))
    return response.results.map(extractNews)
})