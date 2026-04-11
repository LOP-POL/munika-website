<style lang="css" scoped>
    .articles {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-y: auto;
    max-width: 100%;
    background-image: radial-gradient(var(--french-gray) 8%, transparent 8%);
    background-size: 2vmin 2vmin;
    padding: 5px;
}

.article-card {
    background-color: var(--seasalt);
    /* box-shadow: 5px 5px 7px rgba(33, 33, 33, .7); */
    padding: 10px;
    margin: 5px;
    color: black;
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
    border-radius: 2px;
    min-width:400px;

}

.article-card:hover {
    transform: scale(1.1), translateX(2px);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);

}

.article-card-meta {
    color: grey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

</style>

<template>
    <section class="articles">

            <el-skeleton :loading="loading" animated>
                <template #template>
                    <el-skeleton-item variant="h3" style="width: 60%; margin-bottom: 12px;" />
                    <el-skeleton-item variant="text" style="width: 90%; margin-bottom: 8px;" />
                    <el-skeleton-item variant="text" style="width: 80%; margin-bottom: 8px;" />
                    <el-skeleton-item variant="text" style="width: 70%;" />
                </template>
                <template #default>

                    <!-- Data will be rendered by the v-for below -->
                    <div class="article-card" v-for="story in stories?.reverse()" :key="story.id"
                        @click="viewStory(story.id, $event)">
                        <div class="article-card-meta">
                            <span>{{ story.date }}</span>
                            <span class="article-type">{{ story.type }}</span>
                        </div>

                        <h3 style="font-family:Georgia; font-style: italic;">{{ story.title }}</h3>
                        <el-text tag="p" truncated>{{ story.content }}</el-text>
                    </div>
                </template>
            </el-skeleton>
        </section>
</template>
<script setup lang="ts">
import { useNewsStore } from '~/piniaStores/newsStore';
const store = useNewsStore()

const stories = ref(store.getKamunNews)

const loading = ref(true)
function viewStory(storyId:string,e:Event){
if (e && typeof (e as Event).preventDefault === 'function') (e as Event).preventDefault()
navigateTo(`/news`)
}

onMounted(()=>{
    store.fetchNews()
     if(!stories.value){
        store.fetchNews()
        stories.value = store.news.filter((item:any)=>{item.id!=''}).reverse()
        loading.value = false
    }
    else{
        store.fetchNews()
    }
     
})

watch(store.news,(newData)=>{
    if(newData) stories.value = newData.reverse()
},{immediate:true})

watch(stories,()=>{
    if(stories.value){
        loading.value = false
        store.fetchNews()
    }
    else{
        loading.value = true
        store.fetchNews()
    }
    store.fetchNews()
},{immediate:true})
</script>
