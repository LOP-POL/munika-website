<template>
    <div class="collabContainer">
        <head-and-c class="sponsors">
            <template #title>
                Sponsors
            </template>
            <h3>People And Organisations that helped us make this possible.</h3>
            <ContactCard v-for="person in sponsors" :key="person.name" v-bind="person" />
        </head-and-c>
        <br>
        <head-and-c class="partners">
            <template #title>
                Partners
            </template>
           <h3>Our Partner conferences</h3> 
            <ContactCard v-for="person in partners" :key="person.name" v-bind="person" />
        </head-and-c>
    </div>

</template>
<script setup lang="ts">

definePageMeta({
    layout: 'kamun-bar'
})

const { data: sponsorsDoc } = useAsyncData("sponsors", () => queryCollection("sponsors").all())
const { data: partnersDoc } = useAsyncData("partners", () => queryCollection("partners").all())

const sponsors = computed(() => sponsorsDoc.value?.[0]?.data || [])
const partners = computed(() => partnersDoc.value?.[0]?.data || [])



</script>

<style scoped>

</style>