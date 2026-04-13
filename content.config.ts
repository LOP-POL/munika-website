import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from "zod"

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        }),
        News: defineCollection({
            type: "page",
            source: "News/*.md",
            schema: z.object({
                id: z.string(),
                title: z.string(),
                content: z.string(),
                date: z.string(),
                author: z.string(),
                type: z.string(),
                postUrl: z.string(),
            }),
            indexes: [
                //single column index
                { columns: ['type'] },
                {columns: ['id'], unique:true},
                {columns:['author']}
            ]
        })
    }
})
