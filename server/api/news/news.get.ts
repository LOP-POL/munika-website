import { Client } from "@notionhq/client"

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

    return response.results.map(extractNews)
})