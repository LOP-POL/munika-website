<template>
    <head-and-c>
        <template #title>
            Meet The People That Make it Happen !
        </template>

        <div class="p-6">
            <el-tabs v-model="activeTab" type="border-card" stretch class="tabP">

                <!-- All Members -->
                <el-tab-pane label="All" name="all">
                    <head-and-c class="teamHolder">
                        <template #title>
                            Team
                        </template>
                        <p>
                            Thing that the team does short description
                        </p>
                        <div class="teamCon">
                            <ContactCard v-for="person in membersList" :key="person.name" v-bind="person" />
                        </div>

                    </head-and-c>

                </el-tab-pane>

                <!-- Academics -->
                <el-tab-pane label="Academics" name="Academics">
                    <head-and-c class="teamHolder">
                        <template #title>
                            Team
                        </template>
    <p>
        Thing that the team does short description
    </p>                        <div class="teamCon">
                            <ContactCard v-for="person in teams.Academics" :key="person.name" v-bind="person" />
                        </div>

                    </head-and-c>

                </el-tab-pane>

                <!-- Foods and Socials -->
                <el-tab-pane label="Foods and Socials" name="Foods and Socials">
                    <head-and-c class="teamHolder">
                        <template #title>
                            Team
                        </template>
    <p>
        Thing that the team does short description
    </p>                        <div class="teamCon">
                            <ContactCard v-for="person in teams['Foods and Socials']" :key="person.name"
                                v-bind="person" />
                        </div>

                    </head-and-c>

                </el-tab-pane>

                <!-- Delegates -->
                <el-tab-pane label="Delegates" name="Delegates">
                    <head-and-c class="teamHolder">
                        <template #title>
                            Team
                        </template>
    <p>
        Thing that the team does short description
    </p>                        <div class="teamCon">
                            <ContactCard v-for="person in teams.Delegates" :key="person.name" v-bind="person" />
                        </div>

                    </head-and-c>

                </el-tab-pane>

                <!-- Social Media and PR -->
                <el-tab-pane label="Social Media and PR" name="Social Media and PR">
                    <head-and-c class="teamHolder">
                        <template #title>
                            Team
                        </template>
    <p>
        Thing that the team does short description
    </p>                        <div class="teamCon">
                            <ContactCard v-for="person in teams['Social Media and PR']" :key="person.name"
                                v-bind="person" />
                        </div>
                    </head-and-c>

                </el-tab-pane>

            </el-tabs>
        </div>

    </head-and-c>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default',
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    }
})

import type { TeamMember } from '~/dataTypes/DT'
import ContactCard from './ContactCard.vue'


const { data: members } = useAsyncData("members", () => queryCollection('members').all())

const membersList = computed(() => members.value?.[0]?.data || [])


const activeTab = ref("all")
const teams = ref<Record<string, TeamMember[]>>({
    "Academics": [],
    "Foods and Socials": [],
    "Delegates": [],
    "Social Media and PR": []
})



const splitTeams = () => {
    // reset
    Object.keys(teams.value).forEach((team: string) => {
        teams.value[team] = []
    })

    // group members
    membersList.value.forEach(member => {
        if (teams.value[member.team]) {
            teams.value[member.team].push(member)
        }
    })
}

watch(membersList, () => {
    splitTeams()
})

</script>

<style scoped>
.teamCon {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    box-shadow: inset 0px 0px 20px black;
    background-image: url('/styleImgs/landscape-autum.jpg');
    background-position: 0% 0%;
    background-size: cover;
    border-radius: 20px;
    justify-content: center;
    place-items: center;
    align-items: center;
}

</style>