<style>
.collab-con {
    flex: 0 0 clamp(190px, 22vw, 260px);
    width: clamp(190px, 22vw, 260px);
    min-width: 0;
    min-height: 230px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.collab-con:hover{
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
}

.collab-img {
    width: 100%;
    height: 120px;
    flex: 0 0 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 10px;
    padding: 0.75rem;
}

.collab-img img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.img-fallback {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
    border-radius: 10px;
}

.img-fallback span {
    font-size: 2.5rem;
    color: #999;
    font-family: 'Georgia', serif;
    letter-spacing: -0.02em;
    opacity: 0.6;
    font-weight: bold;
}

.fullName {
    margin: 0;
    max-width: 100%;
    background-color: inherit;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

</style>
<template>

    <article class="collab-con">
        <div class="collab-img">
            <img v-if="hasPicture" :src="data.picture" :alt="data.fullName">
            <div v-else class="img-fallback">
                <span>{{ initials }}</span>
            </div>
        </div>
         <el-tooltip
        class="box-item"
        effect="dark"
        :content="data.fullName"
        placement="top-start"
      >
           <p class="fullName">{{ data.fullName }}</p>
      </el-tooltip>
      <el-button v-if="data.website" tag="a" :href="data.website" target="_blank" rel="noopener noreferrer">
        Visit website
      </el-button>


    </article>


</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Collab } from '~/dataTypes/DT';

const { data } = defineProps<{
    data: Collab
}>()

const initials = computed(() =>
    data.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
)

const hasPicture = computed(() => data.picture && data.picture.trim() !== '')

</script>
