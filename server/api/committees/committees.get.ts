import {Client} from  "@notionhq/client"
export default defineEventHandler(async (event)=>{

    const config = useRuntimeConfig()
    const notionApiKey = config.notionApiKey
    const notionCommitteesPage = config.notionCommitteesPage

    if (!notionApiKey) {
        throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
    }

    const notion = new Client({
        auth:notionApiKey,
    })
    
    
    const response = await notion.databases.query({
      database_id: notionCommitteesPage,
      filter: {
        property: 'committee-type',
        multi_select: {
          contains: 'Beginner'
        }
      }
    });
     const response1 = await notion.databases.retrieve({
      database_id: notionCommitteesPage,
    });
   
    

    return {
        "fromQuery":response,"fromRetrieve":response1
    }
})