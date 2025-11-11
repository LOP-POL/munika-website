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
    const responseMeta = await notion.databases.query({
        database_id:metaDatabaseID,
    })
    
    function extractMeta(page:any){
        const props = page.properties
        return {
            id: props.Name.title[0].text.content,
            theme: props.Theme.rich_text[0].text.content,
            startDate: props.StartDate.date.start,
            endDate: props.EndDate.date.start,
            membership: props.Membership.rich_text[0].text.content,
            year: props.year.rich_text[0].text.content
        }
    }

    var metaData = responseMeta.results.map(extractMeta)

    // Find newest page by created_time
    const newestPage = responseMeta.results.reduce((a:any,b:any) => {
        return new Date(a.created_time) > new Date(b.created_time) ? a : b
    }, responseMeta.results[0])
    const newestPageId = newestPage?.id

    let eventsResults: any[] = []

    if (newestPageId) {
        // List blocks of the newest page
        const blocksResp = await notion.blocks.children.list({ block_id: newestPageId, page_size: 100 })
        const childDbBlock = blocksResp.results.find((b:any) => b.type === 'child_database' && b.child_database && b.child_database.title=="Events" )

        if (childDbBlock) {
            const eventsDbId = childDbBlock.id.replace(/-/g, '')
           

            try {
                const dbInfo = await notion.databases.query({ database_id: eventsDbId, page_size: 100 })
               
                

                // Extract event data and format for FullCalendar
                function extractEvent(eventPage:any) {
                    const props = eventPage.properties
                   
                    return {
                        title: props.Name?.title?.[0]?.text?.content || props.title?.rich_text?.[0]?.text?.content || 'Event',
                        start: props.start?.date?.start || null,
                        end: props.end?.date?.start || null,
                        color: props.color?.rich_text?.[0]?.text?.content || '#3b82f6',
                        allDay: props.allDay?.checkbox ?? false,
                        extendedProps: {
                            description: props.description?.rich_text?.[0]?.text?.content || '',
                            location: props.location?.rich_text?.[0]?.text?.content || '',
                            locationLink: props.locationLink?.url || ''
                        }
                    }
                }

                eventsResults = dbInfo.results.map(extractEvent).filter((e:any) => e.start && e.end)
            } catch (err) {
                eventsResults = []
               
            }
        }
        else{
            console.log("no events db")
        }
    }

    // Return combined result
    return {
        meta: metaData,
        events: eventsResults
    }
    // ...existing code...
    // const fs = await import('fs/promises')
    // const path = await import('path')

    // const outDir = path.join(process.cwd(), 'data')
    // await fs.mkdir(outDir, { recursive: true })

    // const outFile = path.join(outDir, 'notion-response.json')
    // await fs.writeFile(outFile, JSON.stringify(response, null, 2), 'utf8')

    // // optional: return the path so caller can use it
    // event.node.res.setHeader('Content-Type', 'application/json')

    // Extract relevant info from each page
   
})