<style>
.main-view-ann {
    max-height: 100%;
    width: 100%;
    max-width: 700px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.00) 100%);
    border-radius: 20px;
    box-sizing: border-box;
    overflow-x: auto;
    margin: 0 auto;
}

.list-view-window {
    width: 100%;
    max-width: 100%;
    padding: 10px;
    margin: 10px 0;
    overflow-y: auto;
    box-sizing: border-box;
}

.story-card {
    background-color: var(--seasalt);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    padding: 10px;
    margin: 10px 0;
    max-width: 100%;
    backdrop-filter: blur(5px);
    color: black;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
}

.story-card:hover {
    transform: scale(0.9);
}

.story-card-meta {
    color: grey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.details-news-window {
    width: 100%;
    max-width: 100%;
    padding: 10px;
    margin: 10px 0;
    overflow-y: auto;
    box-sizing: border-box;
    height: 100%;
}

@media (max-width: 900px) {
    .main-view-ann {
        max-width: 100vw;
        width: 100%;
        padding: 0;
    }

    .list-view-window {
        width: 100%;
        max-width: 100vw;
        margin: 10px 0;
    }
}
</style>
<template>
    <section class="main-view-ann">
        <section class="list-view-window" v-if="!storySelected">
            <h2 class="show-text">Recent</h2>

            <el-skeleton :loading="loading" animated>
                <template #template>
                    <el-skeleton-item variant="h3" style="width: 60%; margin-bottom: 12px;" />
                    <el-skeleton-item variant="text" style="width: 90%; margin-bottom: 8px;" />
                    <el-skeleton-item variant="text" style="width: 80%; margin-bottom: 8px;" />
                    <el-skeleton-item variant="text" style="width: 70%;" />
                </template>
                <template #default>
                  
                        <!-- Data will be rendered by the v-for below -->
                        <div class="story-card" v-for="story in stories" :key="story.id"
                            @click="viewStory(story.id, $event)">
                            <div class="story-card-meta">
                                <span>{{ story.date }}</span>
                                <span class="story-type">{{ story.type }}</span>
                            </div>

                            <h3>{{ story.title }}</h3>
                            <el-text tag="p" truncated>{{ story.content }}</el-text>
                        </div>

                    
                </template>
            </el-skeleton>


        </section>

        <section class="details-news-window" v-if="storySelected">
            <div class="story-card">
                <div class="story-card-meta">
                    <span>{{ selectedStory.date }}</span>
                    <span class="story-type">{{ selectedStory.type }}</span>
                </div>
                <h3>{{ selectedStory.title }}</h3>
                <el-text tag="p">{{ selectedStory.content }}</el-text>
                <el-button warning @click="storySelected = false" style="margin-top:10px;">Close</el-button>
            </div>
        </section>
    </section>

</template>
<script setup lang="ts">
import { ref } from 'vue'

interface newsArticle {
    id: string,
    title: string,
    content: string,
    date: string,
    author: string,
    postUrl: string,
    type: string,
}
const props = defineProps<{
    stories: newsArticle[]
}>()


const stories = ref<newsArticle[]>([])

const loading = ref<boolean>(true)

const storySelected = ref<boolean>(false)
const selectedStory = ref<Record<string, string>>(
    {
        "id": "1",
        "date": new Date().toString(),
        "title": "No Strings to display",
        "content": "We are probably on vaction right now.",
        "type": "update"
    },
)
var dummyData: Record<string, string> =
{
    "id": "1",
    "date": new Date().toString(),
    "title": "No Strings to display",
    "content": "We are probably on vaction right now.",
    "type": "update"
}

function viewStory(id: string, e: Event) {
    storySelected.value = true
    selectedStory.value = stories.value.find((story) => story.id == id) ?? dummyData
}

watch(() => props.stories, (newVal, oldVal) => {
    stories.value = props.stories
    if(props.stories.length){
        stories.value = props.stories
        loading.value = false
    }
}, { immediate: true }
)

</script>