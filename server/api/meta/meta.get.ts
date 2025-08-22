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

    const metaDatabaseID = '21ee15e902a380f4951afe54698a4710'

    // Query all news
    const response = await notion.databases.query({
        database_id:metaDatabaseID,
    })

    // Extract relevant info from each page
   
})