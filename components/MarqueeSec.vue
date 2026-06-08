<style>
.collabWrapper {
    padding: 5px;
    display: flex;
    overflow-x: auto;
    max-height: 600px;
    min-height: 400px;
    gap: 2.5rem;

    border-radius: 20px;
    align-items: center;
}

.marquee {
    overflow: hidden;
    width: 100%;
    background-color: whitesmoke;
}

.marquee-track {
    width: max-content;
    border-radius: 20px;
    user-select: none;
    transition: transform 0.1s ease-out;
}

.marquee-track.animate-marquee {
    animation: marqueeScroll 60s linear infinite;
}

@keyframes marqueeScroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.marquee:hover .marquee-track.animate-marquee {
    animation-play-state: paused;
    cursor: grab;
}

.handle svg {
    height: 20px;
    width: 20px;
}
.toggle-drag-btn-con{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.toggle-drag-btn {
    padding: 8px 16px;
    background-color: var(--french-gray);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 1rem;
    transition: opacity 0.2s;
}

.toggle-drag-btn:hover {
    opacity: 0.8;
}
</style>
<template>
    <head-and-c>
        <template #title>
            Featured Sponsors and Partners
        </template>
        <div class="flex flex-col gap-4">



            <div class="marquee">
              
                <div ref="marqueeTrack"
                    :class="['collabWrapper', 'marquee-track', { 'animate-marquee': !draggingEnabled }]">
                    <template v-for="(collab, index) in collabs" :key="index">
                        <CollabCard :data="collab" />
                        <span class="handle">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 5V19M5 14L3 12L5 10M19 14L21 12L19 10M10 5L10 19"
                                    stroke="var(--french-gray)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>

                    </template>
                    <template v-for="(collab, index) in collabs" :key="index + 'dup'">
                        <CollabCard :data="collab" />
                        <span class="handle">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 5V19M5 14L3 12L5 10M19 14L21 12L19 10M10 5L10 19"
                                    stroke="var(--french-gray)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </template>
                    
                </div>
                  <div class=" toggle-btn-con flex flex-row align-center">
                    <button @click="toggleDragging" class="toggle-drag-btn w-fit">
                        {{ draggingEnabled ? '🖱️ Dragging Mode - Click to Enable Animation' : '✨ Animation Mode - Click   to      Enable Dragging' }}
                    </button>
                  
                </div>

            </div>
        </div>


    </head-and-c>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CollabCard from './collabCard.vue'
import type { Collab } from '~/dataTypes/DT.js'

const isDragging = ref(false)
const draggingEnabled = ref(false)
const marqueeTrack = ref<HTMLElement | null>(null)
const startX = ref(0)
const startTranslate = ref(0)
const currentTranslate = ref(0)

const collabs = ref<Collab[]>([])

const props = defineProps<{
    collabsData: Collab[]
}>()

// Watch for prop changes
watch(() => props.collabsData, (newData) => {
    if (newData) {
        collabs.value = newData
    }
}, { immediate: true })

function toggleDragging() {
    draggingEnabled.value = !draggingEnabled.value
    if (!draggingEnabled.value) {
        currentTranslate.value = 0
        if (marqueeTrack.value) {
            marqueeTrack.value.style.transform = 'translateX(0)'
        }
    }
}

function handleMouseDown(e: MouseEvent) {
    if (!draggingEnabled.value) return

    isDragging.value = true
    startX.value = e.clientX
    startTranslate.value = currentTranslate.value

    if (marqueeTrack.value) {
        marqueeTrack.value.style.cursor = 'grabbing'
    }

    e.preventDefault()
}

function handleMouseMove(e: MouseEvent) {
    if (!isDragging.value || !draggingEnabled.value || !marqueeTrack.value) return

    const deltaX = e.clientX - startX.value
    currentTranslate.value = startTranslate.value + deltaX

    marqueeTrack.value.style.transform = `translateX(${currentTranslate.value}px)`

    if (Math.abs(currentTranslate.value) >= marqueeTrack.value.getBoundingClientRect().width / 2.5) currentTranslate.value = 0
}

function handleMouseUp() {
    isDragging.value = false

    if (marqueeTrack.value) {
        marqueeTrack.value.style.cursor = draggingEnabled.value ? 'grab' : 'default'
    }
}

function handleMouseLeave() {
    if (isDragging.value) {
        isDragging.value = false
    }
}

function handleTouchEnd() {
    isDragging.value = false

    if (marqueeTrack.value) {
        marqueeTrack.value.style.cursor = draggingEnabled.value ? 'grab' : 'default'
    }
}

function handleTouchStart(e: TouchEvent) {
    if (!draggingEnabled.value) return

    isDragging.value = true
    startX.value = e.touches[0].clientX
    startTranslate.value = currentTranslate.value

    e.preventDefault()
}

function handleTouchMove(e: TouchEvent) {
    if (!isDragging.value || !draggingEnabled.value || !marqueeTrack.value) return

    const deltaX = e.touches[0].clientX - startX.value
    currentTranslate.value = startTranslate.value + deltaX

    marqueeTrack.value.style.transform = `translateX(${currentTranslate.value}px)`

    if (Math.abs(currentTranslate.value) >= marqueeTrack.value.getBoundingClientRect().width / 2.5) currentTranslate.value = 0
}

onMounted(() => {
    // Set up marquee track event listeners
    if (marqueeTrack.value) {
        marqueeTrack.value.addEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.addEventListener('mouseleave', handleMouseLeave)
        marqueeTrack.value.addEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.addEventListener('touchend', handleTouchEnd)

        marqueeTrack.value.style.cursor = 'default'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)

    if (marqueeTrack.value) {
        marqueeTrack.value.removeEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.removeEventListener('mouseleave', handleMouseLeave)
        marqueeTrack.value.removeEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.removeEventListener('touchend', handleTouchEnd)
    }
})

</script>
