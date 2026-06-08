<style>
.collab-con {
  
    min-width:100px;
    width: 250px;
    height:fit-content;
    min-height: 200px;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 0.25fr;
    grid-template-areas:
        'pic'
        'name'
    ;
    gap: 1.5rem;
    border-radius: 20px;
    place-items: center;
    
    padding: 1.5rem;
    


}
.collab-con:hover{
    scale:1.025;
}

.collab-img {
    grid-area: pic;
    height: 100%;
    width: 50%;
    border-radius: inherit;
    background-color: inherit;
    display: flex;
    align-items: center;
}

.collab-img img {
    object-fit: cover;
    width: 100%;
    border-radius: 10px;

}

.img-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
    border-radius: 10px;
}

.img-fallback span {
    font-size: 3em;
    color: #999;
    font-family: 'Georgia', serif;
    letter-spacing: -0.02em;
    opacity: 0.6;
    font-weight: bold;
}

.fullName {
    grid-area: name;
    height: 100%;
    max-width: 100%;
    background-color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
.show{
    white-space: wrap;
    overflow: visible;
    text-overflow: unset;
}
</style>
<template>

    <div class="collab-con" @click="openWebsite" @mouseover="showFullName">
        <div class="collab-img">
            <img v-if="hasPicture" :src="data.picture" :alt="data.fullName">
            <div v-else class="img-fallback">
                <span>{{ initials }}</span>
            </div>
        </div>

        <p class="fullName" :class="showName?'show':''">{{ data.fullName }}</p>

    </div>


</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Collab } from '~/dataTypes/DT';

const { data } = defineProps<{
    data: Collab
}>()

const showName = ref(false)

const initials = computed(() =>
    data.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
)

const hasPicture = computed(() => data.picture && data.picture.trim() !== '')

function openWebsite() {
    window.open(`${data.website}`, "_blank");
}

function showFullName(e:MouseEvent){
  e.stopImmediatePropagation()
  e.stopPropagation()
     requestAnimationFrame(() => {
        showName.value = true
        setTimeout(() => {
            showName.value = false
        }, 2000)
    })
}

</script>