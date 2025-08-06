import { Client } from "@notionhq/client"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const notionApiKey = config.notionApiKey
    const notionTeamsPage = config.notionTeamsPage

    if (!notionApiKey) {
        throw new Error('NOTION_API_KEY is missing or not loaded from runtime config')
    }

    const notion = new Client({
        auth: notionApiKey,
    })

    // Helper to extract member info from Notion page
    function extractMember(page: any) {
        const props = page.properties
        return {
            name: props.Name?.title?.[0]?.plain_text ?? "",
            nickname: props.Nickname?.rich_text?.[0]?.plain_text ?? "",
            instagramNickname: props.InstagramNickname?.rich_text?.[0]?.plain_text ?? "",
            picture: props.Picture?.files?.[0]?.file?.url ?? "",
        }
    }

    // Helper to query team members
    async function getTeam(teamName: string) {
        const response = await notion.databases.query({
            database_id: notionTeamsPage,
            filter: {
            and: [
                {
                property: 'Team',
                multi_select: {
                    contains: teamName
                }
                },
                {
                property: 'IfActiveMember',
                select: {
                    equals: 'Active'
                }
                }
            ]
            },
        })
        return response.results.map(extractMember)
    }

    // Query all teams
    const teams: Record<string, any> = {}
    for (const team of ['vorstand', 'socialmediapr', 'delegates', 'academics', 'foodsocials']) {
        teams[team] = await getTeam(team)
    }

    return teams
})