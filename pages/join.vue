<style></style>
<template>
    <head-and-c>
        <template #title>
            Weekly Debates
        </template>
        <p>
            Export topics from global issues to ligthearted dilemmas ina relaxed, supportive setting. Sharpen your
            public
            speaking skills
            while sharing ideas and enjoying engaging discussions. We hope to see you on <NuxtLink to="news"> Tuesdays
                at 7 pm !
            </NuxtLink>
        </p>
    </head-and-c>
    <head-and-c>
        <template #title>
            Attending Conferences
        </template>
        <p>
            Attend prestigious MUN conferences in Germany and worldwide. Engage with changemakers, enjoy unforgettable
            experiences and flex your diplomacy.
        </p>
    </head-and-c>
    <head-and-c>
        <template #title>
            Organizing <NuxtLink to="/kamun">KAMUN</NuxtLink>
        </template>
        <p>
            Step into leadership, gain invalubale skills, form lasting friendships, and discover more about yourself -
            all
            while having a great
            time with an incredible team!
        </p>


    </head-and-c>
    <head-and-c>
        <template #title>
            Download our <a :href="flyer" ref="flyerRef">flyer </a> for reference and share with your friends.
        </template>
      
    </head-and-c>
</template>
<script setup>
import { ref } from 'vue';

const flyer = '/stylesImgs/flyer.jpg';
const flyerRef = ref(null);

onMounted(() => {
    if (flyerRef.value) {
        flyerRef.value.setAttribute('download', 'flyer.jpg');
    }
});


</script>