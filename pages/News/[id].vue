<script lang="ts" setup>
const route = useRoute()
    const { data: post } = await useAsyncData(`news_${route.path}`, () => queryCollection("News").path(route.path).first())
</script>
<template>
    <head-and-c>
          <ContentRenderer v-if="post" :value="post"/>
    <div v-else>
        Post not found 

    </div>
    </head-and-c>
  
</template>