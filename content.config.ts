import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from "zod"

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        }),
        sponsors:defineCollection({
            type:"data",
            source:"collaborations/sponsors.json",
            schema:z.object({
                data:z.array(z.object({
                    name:z.string(),
                    role:z.string(),
                    bio:z.string(),
                    picture:z.string().nullable(),
                    website:z.string(),
                    linkedin:z.string()
                }))
            })
        }),
        partners:defineCollection({
            type:"data",
            source:"collaborations/partners.json",
            schema:z.object({
                data:z.array(z.object({
                    name:z.string(),
                    role:z.string(),
                    bio:z.string(),
                    picture:z.string().nullable(),
                    website:z.string(),
                    linkedin:z.string()
                }))
            })
        }),
        members:defineCollection({
            type:"data",
            source:"members/*.json",
            schema:z.object({
                data:z.array(z.object({
                    name:z.string(),
                    role:z.string(),
                    bio:z.string(),
                    picture:z.string(),
                    team:z.string(),
                    website:z.string(),
                    linkedin:z.string()
                }))
            })
        }),

        meetings:defineCollection({
            type:'page',
            source:'meetings/*.md',
            schema: z.object({
                title: z.string(),
                content: z.string(),
                date: z.string(),
                startTime:z.string(),
                endTime:z.string(),
                location:z.string(),
                extra:z.boolean(),
            }),
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
