 import { Client } from "@notionhq/client"
 
 export default defineEventHandler(async (event) => {
     const config = useRuntimeConfig()
     const notionApiKey = config.notionApiKey
    const notionChairsPage = "20fe15e902a380cdb361dd73fc7b239a"
 
     if (!notionApiKey) {
         throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
     }
 
     const notion = new Client({
         auth: notionApiKey,
     })
 
     // Query all news
     const response = await notion.databases.query({
         database_id: notionChairsPage,
     })
 
     // Extract relevant info from each page
     function extractNews(page: any) {
         const props = page.properties
         return {
            
         }
     }
 
     return response.results.map(extractNews)
 })