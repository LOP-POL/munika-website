import {Client} from  "@notionhq/client"
export default defineEventHandler(async (event)=>{
    const config = useRuntimeConfig()
    const notionApiKey = config.notionApiKey
    const notionPage = config.notionQuotesPage

    if (!notionApiKey) {
        throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
    }

    const notion = new Client({
        auth:notionApiKey,
    })
    
   
    const response = await notion.databases.query({
      database_id:notionPage,
    });
     const response1 = await notion.databases.retrieve({
      database_id: notionPage,
    });
   
   

    return {
        response
    }
})