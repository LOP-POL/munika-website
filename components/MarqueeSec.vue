<style>
.collabWrapper {
    padding: 5px;
    /* display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
 
  max-height:500px; */
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

.handle svg {
    height: 20px;
    width: 20px;
}

/* Pause on hover - handled by Web Animations API */
.marquee:hover .marquee-track {
    animation-play-state: paused;
    cursor: grab;
}
</style>
<template>
    <head-and-c>
        <template #title>
            Featured Sponsors and Partners
        </template>
        <div class="marquee">
            <div ref="marqueeTrack" class="collabWrapper marquee-track" @mousedown="handleMouseDown"
                @mouseleave="handleMouseLeave" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
                @mouseover="(e)=>(handleMouseOver(e))" @mouseout="handleMouseUp">
                <template v-for="(collab, index) in collabs" :key="index">
                    <CollabCard :data="collab" />
                    <span class="handle">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5V19M5 14L3 12L5 10M19 14L21 12L19 10M10 5L10 19" stroke="var(--french-gray)"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>

                </template>
                <template v-for="(collab, index) in collabs" :key="index + 'dup'">
                    <CollabCard :data="collab" />
                    <span class="handle">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5V19M5 14L3 12L5 10M19 14L21 12L19 10M10 5L10 19" stroke="var(--french-gray)"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </template>


            </div>
        </div>


    </head-and-c>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CollabCard from './collabCard.vue'
import type { Collab } from '~/dataTypes/DT.js'


const isDragging = ref(false)
const marqueeTrack = ref<HTMLElement | null>(null)
const startX = ref(0)
const startTranslate = ref(0)
const currentTranslate = ref(0)

const collabs = ref<Collab[]>([])

const { collabsData } = defineProps<{
    collabsData: Collab[]
}>()
function handleMouseDown(e: MouseEvent) {
    isDragging.value = true
    startX.value = e.clientX
    startTranslate.value = currentTranslate.value

    if (marqueeTrack.value) {
        marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())
        marqueeTrack.value.style.cursor = 'grabbing'
    }

    e.preventDefault()
}

function handleMouseMove(e: MouseEvent) {
    if (!isDragging.value || !marqueeTrack.value) return

    const deltaX = e.clientX - startX.value
    currentTranslate.value = startTranslate.value + deltaX

    marqueeTrack.value.style.transform = `translateX(${currentTranslate.value}px)`
}

function startMarqueeAnimation() {
    if (!marqueeTrack.value) return

    // Cancel any existing animations
    marqueeTrack.value.getAnimations().forEach(animation => animation.pause())

    // Create scroll animation
    marqueeTrack.value.animate(
        [
            { transform: `translateX(${currentTranslate.value}px)` },
            { transform: 'translateX(-50%)' }
        ],
        {
            duration: 40000,
            easing: 'linear',
            iterations: Infinity,
            fill: 'forwards'
        }
    )

    marqueeTrack.value.style.cursor = 'grab'
}

function handleMouseUp() {
    isDragging.value = false

    if (marqueeTrack.value) {

        startMarqueeAnimation()
    }
}

function handleMouseOver(e: MouseEvent) {
    startX.value = e.clientX
    startTranslate.value = currentTranslate.value

   if (marqueeTrack.value) {
        marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())
        marqueeTrack.value.style.cursor = 'grabbing'
    }

    e.preventDefault()
}
function handleMouseLeave() {
    if (isDragging.value) {
        if (marqueeTrack.value) marqueeTrack.value.getAnimations().forEach(animation => animation.play())
        handleMouseUp()
        isDragging.value = false
    }// else {
    //   startMarqueeAnimation()

    // }
}

function handleTouchEnd() {
    isDragging.value = false

    if (marqueeTrack.value) {

        startMarqueeAnimation()
    }
}
function handleTouchStart(e: TouchEvent) {
    isDragging.value = true
    startX.value = e.touches[0].clientX
    startTranslate.value = currentTranslate.value

    if (marqueeTrack.value) {
        marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())
    }

    e.preventDefault()
}

function handleTouchMove(e: TouchEvent) {
    if (!isDragging.value || !marqueeTrack.value) return

    const deltaX = e.touches[0].clientX - startX.value
    currentTranslate.value = startTranslate.value + deltaX

    marqueeTrack.value.style.transform = `translateX(${currentTranslate.value}px)`
}

onMounted(() => {
    // Populate collabs from fetched data
    if (collabsData) {
        collabs.value = collabsData as Collab[]
    }

    // Set up marquee track event listeners
    if (marqueeTrack.value) {
       
        marqueeTrack.value.addEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.addEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.style.cursor = 'grab'

        // Start the scrolling animation
        startMarqueeAnimation()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

})
watch(()=>collabsData,()=>{
    if (collabsData) {
        collabs.value = collabsData as Collab[]
    }
})
onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)

    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    if (marqueeTrack.value) {
        marqueeTrack.value.removeEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.removeEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())
    }

})

</script>
