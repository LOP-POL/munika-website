// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@element-plus/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig:{
    notionApiKey: process.env.NUXT_NOTION_API_KEY,
    notionCommitteesPage: process.env.NUXT_NOTION_COMMITTEES_PAGE_ID,
    notionQuotesPage: process.env.NUXT_NOTION_QUOTES_PAGE_ID
  }
})

