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
.story-card:hover{
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
            <div class="story-card" v-for="story in stories" :key="story.id" @click="viewStory(story.id,$event)">
                <div class="story-card-meta">
                      <span>{{ story.date }}</span>
                  <span class="story-type">{{ story.type }}</span>
                </div>
                
                <h3>{{ story.title }}</h3>
                <el-text tag="p" truncated>{{ story.content }}</el-text>
            </div>
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

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
const stories = ref<Array<Record<string, string>>>([
    {
        "id": "2",
        "date": formatDate(new Date().toString()),
        "title": "Keynote Speaker Announced",
        "content": "We are thrilled to welcome Dr. Jane Smith as our keynote speaker for MUNIKA 2024. Don’t miss her inspiring address at the opening ceremony.",
        "type": "announcement"
    },
    {
        "id": "3",
        "date": formatDate(new Date().toString()),
        "title": "Early Bird Registration Deadline",
        "content": "Early bird registration ends soon! Register by March 15th to take advantage of discounted rates.",
        "type": "reminder"
    },
    {
        "id": "4",
        "date": formatDate(new Date().toString()),
        "title": "Workshop Schedule Released",
        "content": "Check out the full schedule of workshops and sessions now available on our website. Plan your MUNIKA 2024 experience today!",
        "type": "update"
    },
    {
        "id": "1",
        "date": formatDate(new Date().toString()),
        "title": "Delegate Applications open",
        "content": "We are excited to announce that delegate applications for MUNIKA 2024 are now open! Apply now to secure your spot and be part of an unforgettable experience.",
        "type": "update"
    },
])
const storySelected =  ref<boolean>(false)
const selectedStory = ref<Record<string,string>>(
    {
        "id": "1",
        "date": new Date().toString(),
        "title": "Delegate Applications open",
        "content": "We are excited to announce that delegate applications for MUNIKA 2024 are now open! Apply now to secure your spot and be part of an unforgettable experience.",
        "type": "update"
    },
)
var dummyData:Record<string,string> = 
     {
        "id": "1",
        "date": new Date().toString(),
        "title": "Delegate Applications open",
        "content": "We are excited to announce that delegate applications for MUNIKA 2024 are now open! Apply now to secure your spot and be part of an unforgettable experience.",
        "type": "update"
    }

function viewStory(id:string,e:Event){
    storySelected.value = true
    selectedStory.value = stories.value.find((story) => story.id == id) ?? dummyData
}
</script>