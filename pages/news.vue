<style>
.boxes3 {
    height: 175px;
    width: 153px;
}

#n img {
    max-height: none !important;
    max-width: none !important;
    background: none !important
}

#inst i {
    max-height: none !important;
    max-width: none !important;
    background: none !important
}

.bulletinAndInsta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "insta update";
    gap: 20px;
    max-width: 100vw;
    width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
    max-height: 100vh;

}

.bulletinAndInsta .instagram-media {
    grid-area: insta;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: auto;

}

.update {
    grid-area: update;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
    height: 100vh;
    max-height: 700px;
}

.instagram-media {
    border-radius: 20px;
    padding: 5px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.00) 100%);
    max-height: 700px;
    max-height: 100vh;
}

@media (max-width: 900px) {
    .bulletinAndInsta {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        max-width: 100vw;
        width: 100%;
    }

    .bulletinAndInsta .instagram-media,
    .update {
        width: 100%;
        max-width: 100%;
    }
}

/* Prevent horizontal scroll on body */
body {
    overflow-x: hidden;
}
</style>

<template>

    <head-and-c>
        <template #title>
            What's new !
        </template>
        <NewsAnnounceV2 :stories="stories.slice().reverse()" :instaKey="instaKey" />
        <!-- id: z.string(),
                title: z.string(),
                content: z.string(),
                date: z.string(),
                author: z.string(),
                type: z.string(),
                postUrl: z.string(),
            }), -->
        <!-- <NuxtLink to="/Blogs/">Blog Post</NuxtLink>
        <NuxtLink v-for="doc in posts" :key="doc.id" :to="doc.path">
            <h2>{{ doc.title }}</h2>
            <p>{{ doc.content }}</p>
        </NuxtLink> -->


      

    </head-and-c>
    <br>

    <section id="calendar">
        <head-and-c :divider="true">
            <template #title>
                Calendar
            </template>
            <div>
                <RegularMeetings/>
                <Calendar />
            </div>
        </head-and-c>
    </section>
</template>

<!-- <script async src="https://www.instagram.com/embed.js"></script> -->


<!-- <script type="text/javascript" src="https://www.embedista.com/j/instagramfeed1707.js"></script> -->

<script setup lang="ts">
import { onMounted, onActivated, ref } from 'vue'
import TimerCard from '~/components/TimerCard.vue'
import { useRouter, useHead } from '#app'
import Calendar from '~/components/Calendar.vue'
import type { NewsCollectionItem } from '@nuxt/content'
import RegularMeetings from '~/components/RegularMeetings.vue'
// import NewsAnnounce from '~/components/NewsAnnounce.vue'

// const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useHead({
    script: [{
        src: 'https://www.instagram.com/embed.js',
        defer: true,
        async: true,
    }]
})

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}
const newsState = useState<any[] | null>('newsCache', () => null)
// I am trying to connect the data that will be coming in in form of markdown for the content plugin and that from notion
const { data: posts } = useAsyncData("NewsContent", () => {
    return queryCollection("News").limit(10).all()
})

function extractNewsFromCollection(res: NewsCollectionItem) {
    return {
        id: res.id,
        title: res.title,
        content: res.content,
        date: formatDate(res.date),
        author: res.author,
        type: res.type,
        postUrl: res.path
    }
}



const loaded = ref<boolean>(false)
const instaKey = computed((): string => `loaded-${loaded}`)
interface newsArticle {
    id: string,
    title: string,
    content: string,
    date: string,
    author: string,
    postUrl: string,
    type: string,
}

const dummyData = [
    {
        id: "101",
        title: "MUNIKA 2024 Registration Now Open",
        content: "We are excited to announce that registration for MUNIKA 2024 is officially open! Secure your spot and join delegates from around the world for an unforgettable conference experience.",
        date: formatDate("2024-06-01"),
        author: "MUNIKA Team",
        postUrl: "https://munika.example.com/news/101",
        type: "announcement"
    },
    {
        id: "102",
        title: "Venue Details Released",
        content: "The MUNIKA 2024 conference will be held at the Grand Convention Center, downtown. Visit our website for directions, accommodation options, and more information.",
        date: formatDate("2024-06-05"),
        author: "MUNIKA Team",
        postUrl: "https://munika.example.com/news/102",
        type: "update"
    },
    {
        id: "103",
        title: "Call for Workshop Proposals",
        content: "We invite all participants to submit workshop proposals for MUNIKA 2024. Share your expertise and contribute to a diverse and engaging program. Submission deadline: July 1st.",
        date: formatDate("2024-06-10"),
        author: "MUNIKA Team",
        postUrl: "https://munika.example.com/news/103",
        type: "reminder"
    }
]
const stories = ref<newsArticle[]>([])


function loadInstagramEmbedScript() {
    // Only add the script if it doesn't already exist
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.instagram.com/embed.js';
        script.onload = () => {
            // After the script loads, reprocess embeds
            if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
                window.instgrm.Embeds.process();
            }
            // Fix embed container style after load
            setTimeout(() => {
                document.querySelectorAll('.instagram-media').forEach((el) => {
                    (el as HTMLElement).style.position = 'static';
                    (el as HTMLElement).style.maxWidth = '100%';
                });
            }, 500);
        };
        document.body.appendChild(script);
        loaded.value = !loaded.value
    } else {
        // If script already loaded, reprocess embeds and fix style
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
            window.instgrm.Embeds.process();
        }
        setTimeout(() => {
            document.querySelectorAll('.instagram-media').forEach((el) => {
                (el as HTMLElement).style.position = 'static';
                (el as HTMLElement).style.maxWidth = '100%';
            });
        }, 500);
    }
}

onMounted(async () => {
    if (newsState.value) {
        stories.value = newsState.value as newsArticle[]

        if (posts.value) {
            stories.value = stories.value.concat(posts.value.map(extractNewsFromCollection))
        }
        else{
             const res2 = await queryCollection("News").limit(10).all()
            stories.value = stories.value.concat(res2.map(extractNewsFromCollection))
           
        }
        loaded.value = true
    } else {
        try {
            const res = await $fetch('/api/news/news')
            if (Array.isArray(res)) {
                res.forEach((item: any) => {
                    if (item.date) {
                        item.date = formatDate(item.date)
                    }
                })
            }
            newsState.value = res
            stories.value = res as newsArticle[]
            if (posts.value) {
                stories.value = stories.value.concat(posts.value.map(extractNewsFromCollection))
            }
            else{
                const res2 = await queryCollection("News").limit(10).all()
                stories.value = stories.value.concat(res2.map(extractNewsFromCollection))
            }

            loaded.value = true

        } catch (err) {
            console.error('Failed to load news', err)
            // optionally fall back to dummyData
            // stories.value = dummyData
        }
    }
})

onMounted(() => {
    loadInstagramEmbedScript();
})

onActivated(() => {
    loadInstagramEmbedScript();
});
</script>