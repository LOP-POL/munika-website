// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@element-plus/nuxt'
  ],
  nitro: {
    externals: {
      external: [],
      inline: ['@notionhq/client'] // 👈 Force inline bundling
    }
  },
  css: ['~/assets/css/main.css','~/assets/css/kamun.css'],
  runtimeConfig:{
    notionApiKey: process.env.NUXT_NOTION_API_KEY,
    notionCommitteesPage: process.env.NUXT_NOTION_COMMITTEES_PAGE_ID,
    notionQuotesPage: process.env.NUXT_NOTION_QUOTES_PAGE_ID,
    notionTeamsPage: process.env.NUXT_NOTION_TEAMS_PAGE_ID,
    notionNewsPage: process.env.NUXT_NOTION_NEWS_DATABASE_ID
  },
  app:{
    head:{
      title:"MUNKIA",
      meta:[
        {name:'description' , content:'Model United Nations Initiative Karlsruhe , MUN, Debate, Diplomacy, United Nations, KAMUN'}
      ]
    }
  }
})

