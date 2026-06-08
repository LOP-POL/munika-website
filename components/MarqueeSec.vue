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
            <div ref="marqueeTrack" class="collabWrapper marquee-track">
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CollabCard from './collabCard.vue'
import type { Collab } from '~/dataTypes/DT.js'

const isDragging = ref(false)
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
    marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())

    // Reset transform for smooth animation
    marqueeTrack.value.style.transform = `translateX(${currentTranslate.value}px)`

    console.log(marqueeTrack.value.getBoundingClientRect().width)
    console.log(currentTranslate.value)
    if (Math.abs(currentTranslate.value) >= marqueeTrack.value.getBoundingClientRect().width / 2.5) currentTranslate.value = 0
    startTranslate.value = currentTranslate.value


    // Create continuous scroll animation
    marqueeTrack.value.animate(
        [
            { transform: `translateX(${currentTranslate.value}px)` },
            { transform: 'translateX(-50%)' }
        ],
        {
            duration: 60000,
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
         marqueeTrack.value.getAnimations().forEach(animation => animation.play())
        startMarqueeAnimation()
    }
}

function handleMouseLeave() {
    if (isDragging.value) {
        isDragging.value = false
    }


}
function handleMouseOver(e: MouseEvent) {
    e.stopImmediatePropagation()
   
}
function handleMouseOut(e:MouseEvent) {
    

   
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
    // Set up marquee track event listeners
    if (marqueeTrack.value) {
        marqueeTrack.value.addEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.addEventListener('mouseleave', handleMouseLeave)
        marqueeTrack.value.addEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.addEventListener('touchend', handleTouchEnd)
        marqueeTrack.value.addEventListener('mouseover', handleMouseOver)
        marqueeTrack.value.addEventListener('mouseout', handleMouseOut)
        marqueeTrack.value.style.cursor = 'grab'

        // Start the scrolling animation
        startMarqueeAnimation()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

})
onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
    window.removeEventListener('mouseover', handleMouseOver)
    window.removeEventListener('mouseout', handleMouseOut)

    if (marqueeTrack.value) {
        marqueeTrack.value.removeEventListener('mousedown', handleMouseDown)
        marqueeTrack.value.removeEventListener('mouseleave', handleMouseLeave)
        marqueeTrack.value.removeEventListener('touchstart', handleTouchStart)
        marqueeTrack.value.removeEventListener('touchend', handleTouchEnd)
        marqueeTrack.value.removeEventListener('mouseover', handleMouseOver)
        marqueeTrack.value.removeEventListener('mouseout', handleMouseOut)
        marqueeTrack.value.getAnimations().forEach(animation => animation.cancel())
    }
})

</script>
