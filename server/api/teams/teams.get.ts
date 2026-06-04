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
            picture: props.Picture?.files?.[0]?.file?.url ?? props.Picture?.files?.[0]?.external.url ??"",
        }
    }

    function extractMemberRoles(page: any) {
        const props = page.properties
        console.log(props)
        return {
            fullName: props.FullName?.title?.[0]?.plain_text ?? "",
            picture: props.Picture?.files?.[0]?.file?.url ?? props.Picture?.files?.[0]?.external.url??"",
            role: props.Role?.rich_text?.[0]?.plain_text ?? "",
            info:
                [
                    {
                        type: "link", value: {
                            platform: props.platform?.multi_select?.[0]?.name ?? null,
                            link: props.link?.url ?? null,
                        }
                    },
                    { type: "studywhere", value: props.StudyWhere?.rich_text?.[0]?.plain_text ?? null, },
                    { type: "studywhat", value: props.StudyWhat?.rich_text?.[0]?.plain_text ?? null, },

                ]
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

    // Helper to query team members with extra info and roles
    async function getTeamRole(teamName: string) {
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
        return response.results.map(extractMemberRoles)
    }

    // Query all teams
    const teams: Record<string, any> = {}
    for (const team of ['vorstand', 'socialmediapr', 'delegates', 'academics', 'foodsocials']) {
        teams[team] = await getTeam(team)
    }

    const teamRoles: Record<string, any> = {}
    for (const team of ['vorstand', 'socialmediapr', 'delegates', 'academics', 'foodsocials']) {
        teams[team] = await getTeamRole(team)
    }



    return {teams,teamRoles}
})