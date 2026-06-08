<template>
    <head-and-c>
        <template #title>
            Meet The People That Make it Happen !
        </template>

        <div v-if="loading" class="skeleton-loader">
            <div class="skeleton-card" v-for="n in 2" :key="n">
                <div class="skeleton-img"></div>
                <div class="skeleton-lines">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
        </div>


        <div v-else class="p-6">
            <el-tabs v-model="activeTab" stretch class="tabP" :tabPosition="isBelow1000 ? 'top' : 'left'">
                <el-tab-pane v-for="tab in teamTabs" :key="tab.name" :label="tab.label" :name="tab.name">
                    <head-and-c>
                        <!-- <template #title>{{ tab.label }}</template> -->
                        <p>{{ tab.desc }}</p>
                    </head-and-c>
                    <div class="teamCon">
                        <el-container v-for="member in membersList[tab.name]">

                            <TeamCardV2 :member="member" />



                        </el-container>
                    </div>



                </el-tab-pane>
                <el-tab-pane label="All" name="all">
                    <div class="teamCon">

                        <div v-for="member in allMembers" :key="member.name" >
                            <TeamCardV2 :member="member" />
                        </div>

                    </div>

                </el-tab-pane>
            </el-tabs>


        </div>

    </head-and-c>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'kamun-bar',
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    }
})

import TeamCardV2 from '~/components/TeamCardV2.vue'
import type { TeamMemberRole } from '~/dataTypes/DT'


const isBelow1000 = ref(false)

let mediaQuery: any

const update = (e: any) => {
    isBelow1000.value = e.matches
}

onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 1000px)')
    isBelow1000.value = mediaQuery.matches
    mediaQuery.addEventListener('change', update)
})

onUnmounted(() => {
    mediaQuery.removeEventListener('change', update)
})


const loading = ref<boolean>(false)

const { data: members } = await useFetch<Record<string, TeamMemberRole[]>>('/api/teams/teams2026',{
  cache: 'force-cache',
  server: true
})

const membersList = computed(() => members.value ?? {})


const allMembers = computed<TeamMemberRole[]>(() => {
    let result: TeamMemberRole[] = []
    if (members.value) {
        Object.values(members.value).forEach((array) => {
            result = result.concat(array)
        })
        return result
    }
    return []

})

const teamTabs = [
    { name: 'vorstand', label: 'Vorstand', desc: 'The Vorstand (Board) oversees the organization and vision of KAMUN, ensuring everything runs smoothly and our values are upheld.' },
    { name: 'academics', label: 'Academics Team', desc: 'The Academics Team curates the topics, prepares study guides, and supports delegates in all academic matters throughout the conference.' },
    { name: 'foodsocials', label: 'Food & Socials Team', desc: 'The Food & Socials Team organizes all meals, social events, and ensures everyone has a great time outside of committee sessions.' },
    { name: 'delegates', label: 'Delegates', desc: 'Our Delegates are the heart of KAMUN, representing countries, debating, and working together to solve global issues.' },
    { name: 'socialmediapr', label: 'Social Media and PR', desc: 'The Social Media and PR Team crafts our public image, shares updates, and connects KAMUN with the world—ensuring our story reaches every corner.' }
]

const activeTab = ref("all")




</script>

<style scoped>
.teamCon {
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
   place-items: center;
   justify-content: center;
   background: radial-gradient(var(--french-gray) 8%, transparent 8%);
   
   background-size: 5vmin 5vmin;
   background-repeat: repeat;
}

.skeleton-loader {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin: 2rem 0;
}

.skeleton-card {
    background: #eee;
    border-radius: 1.6rem;
    width: 300px;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 3rem .5rem hsla(0, 0%, 0%, .1);
    animation: skeleton-fade 1.5s infinite alternate;
}

@keyframes skeleton-fade {
    0% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
}

.skeleton-img {
    width: 80%;
    height: 180px;
    background: #ccc;
    border-radius: 10px;
    margin: 2rem 0 1rem 0;
}

.skeleton-lines {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.skeleton-line {
    height: 18px;
    background: #ddd;
    border-radius: 5px;
    width: 100%;
}

.skeleton-line.short {
    width: 60%;
}
</style>