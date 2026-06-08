import { Client } from "@notionhq/client"
import { Collab } from "~/dataTypes/DT"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const notionApiKey = config.notionApiKey
   
    if (!notionApiKey) {
        throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
    }

    const notion = new Client({
        auth: notionApiKey,
    })

    const collabsDbID = '378e15e902a38059885be1bad394cecf'

    // Query all news
    const responseData = await notion.databases.query({
        database_id:collabsDbID,
    })

    function extractCollab(page:any):Collab{
        const props = page.properties
        return {
            name: props.Name.title[0]?.text.content || '',
            fullName: props.fullName.rich_text[0]?.text.content || '',
            website: props.website.url || '',
            picture: props.picture.files[0]?.file?.url || props.picture.files[0]?.external?.url || '',
            affiliation: props.affiliation.multi_select[0]?.name || '',
            type: props.typeOrg.multi_select[0]?.name || '',
        } as Collab
    }

    const collabsData = responseData.results.map(extractCollab)


    return collabsData

})