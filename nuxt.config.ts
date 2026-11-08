// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@element-plus/nuxt', '@pinia/nuxt', 'nuxt-studio', '@vueuse/nuxt','shadcn-nuxt'],
  nitro: {
    prerender: {
      routes:['/KAMUN/','/news']
    },
    preset: 'netlify',
    externals: {
      external: [],
      inline: ['@notionhq/client'] // 👈 Force inline bundling
    }
  },
  studio: {
    //Studio admin login route
    route: '/_studio',
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'LOP-POL', // your GitHub/GitLab username or organization
      repo: 'munika-website', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }

  },
  css: ['~/assets/css/main.css', '~/assets/css/kamun.css','~/assets/css/tailwind.css'],
  runtimeConfig: {
    notionApiKey: process.env.NUXT_NOTION_API_KEY,
    notionCommitteesPage: process.env.NUXT_NOTION_COMMITTEES_PAGE_ID,
    notionQuotesPage: process.env.NUXT_NOTION_QUOTES_PAGE_ID,
    notionTeamsPage: process.env.NUXT_NOTION_TEAMS_PAGE_ID,
    notionNewsPage: process.env.NUXT_NOTION_NEWS_DATABASE_ID,

  },
  vite: {
      plugins: [
        tailwindcss(),
      ],
  },
  shadcn: {
      /**
       * Prefix for all the imported component.
       * @default "Ui"
       */
      prefix: '',
      /**
       * Directory that the component lives in.
       * Will respect the Nuxt aliases.
       * @link https://nuxt.com/docs/api/nuxt-config#alias
       * @default "@/components/ui"
       */
      componentDir: './components/ui'
    },
  app: {
    head: {
      title: "MUNIKA",
      meta: [
        { name: 'description', content: 'Model United Nations Initiative Karlsruhe , MUN, Debate, Diplomacy, United Nations, KAMUN' }
      ]
    },
    pageTransition:false
  }
})
