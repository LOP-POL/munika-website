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
    cursor: grab;
}

.marquee:active {
    cursor: grabbing;
}

.marquee-track {
    width: max-content;
    border-radius: 20px;
    user-select: none;
    will-change: transform;
}

.handle svg {
    height: 20px;
    width: 20px;
}
</style>

<template>
    <head-and-c>
        <template #title>
            Featured Sponsors and Partners
        </template>
        <div class="flex flex-col gap-4">
            <div
                ref="marqueeEl"
                class="marquee"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                @mousedown="handleMouseDown"
                @touchstart.prevent="handleTouchStart"
            >
                <div ref="marqueeTrack" class="collabWrapper marquee-track">
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
            </div>
        </div>
    </head-and-c>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CollabCard from './collabCard.vue'
import type { Collab } from '~/dataTypes/DT.js'

// ─── Refs ──────────────────────────────────────────────────────────────────────
const marqueeEl    = ref<HTMLElement | null>(null)
const marqueeTrack = ref<HTMLElement | null>(null)

const isDragging       = ref(false)
const startX           = ref(0)
const dragStartPx      = ref(0)   // translateX in px when drag began
const currentOffsetPx  = ref(0)   // live offset while dragging

// Web Animations API instance — kept so we can pause / cancel / replace it
let anim: Animation | null = null

const DURATION_MS  = 120_000   // 60s for a full -50% scroll (matches your original)
const collabs      = ref<Collab[]>([])

const props = defineProps<{ collabsData: Collab[] }>()

watch(() => props.collabsData, (newData) => {
    if (newData) collabs.value = newData
}, { immediate: true })

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Total scrollable width = half the track (because content is duplicated) */
function halfWidth(): number {
    return (marqueeTrack.value?.scrollWidth ?? 0) / 2
}

/**
 * Start (or resume) the scroll animation from a given px offset.
 * The animation goes from `fromPx` → `-halfWidth()` then re-chains from 0.
 * This is how the loop works: no rAF, no polling — just the `finish` event.
 */
function startAnimation(fromPx: number = 0): void {
    if (!marqueeTrack.value) return

    const hw       = halfWidth()
    const distance = Math.abs(fromPx) < hw ? hw - Math.abs(fromPx) : hw
    // Keep duration proportional to remaining distance so speed stays constant
    const duration = DURATION_MS * (distance / hw)

    anim = marqueeTrack.value.animate(
        [
            { transform: `translateX(${fromPx}px)` },
            { transform: `translateX(${-hw}px)` },
        ],
        {
            duration,
            easing: 'linear',
            fill: 'forwards',   // hold the end position
        }
    )

    // When this leg finishes, snap back to 0 and start a fresh full-width loop
    anim.addEventListener('finish', () => {
        currentOffsetPx.value = 0
        startAnimation(0)
    }, { once: true })
}

/** Pause animation and return the current translateX in px via boundingClientRect */
function pauseAndCapture(): number {
    if (!marqueeTrack.value || !anim) return 0

    anim.pause()

    const trackRect  = marqueeTrack.value.getBoundingClientRect()
    const parentRect = marqueeEl.value!.getBoundingClientRect()
    const capturedPx = trackRect.left - parentRect.left

    // ✓ Write position to inline style BEFORE cancel removes the animation effect
    marqueeTrack.value.style.transform = `translateX(${capturedPx}px)`

    return capturedPx
}
// ─── Hover — pause / resume ────────────────────────────────────────────────────


function handleMouseEnter(): void {
    if (isDragging.value) return
    anim?.pause()
}

function handleMouseLeave(): void {
    if (isDragging.value) return

    // Resume from wherever the CSS left us — capture position then restart
    const currentPx = pauseAndCapture()  // already paused, just get position
    anim?.cancel()
    startAnimation(currentPx)
}

// ─── Drag ──────────────────────────────────────────────────────────────────────

function handleMouseDown(e: MouseEvent): void {
    isDragging.value  = true
    startX.value      = e.clientX
    dragStartPx.value = pauseAndCapture()   // freeze animation, grab position
    anim?.cancel()                          // fully detach the animation

    if (marqueeEl.value) marqueeEl.value.style.cursor = 'grabbing'
    e.preventDefault()
}

function handleTouchStart(e: TouchEvent): void {
    isDragging.value  = true
    startX.value      = e.touches[0].clientX
    dragStartPx.value = pauseAndCapture()
    anim?.cancel()
}

function handleMouseMove(e: MouseEvent): void {
    if (!isDragging.value || !marqueeTrack.value) return

    const delta          = e.clientX - startX.value
    currentOffsetPx.value = dragStartPx.value + delta

    // Wrap: if dragged past -halfWidth snap the reference so it feels infinite
    const hw = halfWidth()
    if (currentOffsetPx.value < -hw)      currentOffsetPx.value += hw
    if (currentOffsetPx.value > 0)         currentOffsetPx.value -= hw

    marqueeTrack.value.style.transform = `translateX(${currentOffsetPx.value}px)`
}

function handleTouchMove(e: TouchEvent): void {
    if (!isDragging.value || !marqueeTrack.value) return

    const delta           = e.touches[0].clientX - startX.value
    currentOffsetPx.value = dragStartPx.value + delta

    const hw = halfWidth()
    if (currentOffsetPx.value < -hw) currentOffsetPx.value += hw
    if (currentOffsetPx.value > 0)   currentOffsetPx.value -= hw

    marqueeTrack.value.style.transform = `translateX(${currentOffsetPx.value}px)`
}

function handleMouseUp(): void {
    if (!isDragging.value) return
    isDragging.value = false

    if (marqueeEl.value) marqueeEl.value.style.cursor = 'grab'

    // Start a new animation leg from wherever the user dropped
    startAnimation(currentOffsetPx.value)
}

function handleTouchEnd(): void {
    if (!isDragging.value) return
    isDragging.value = false
    startAnimation(currentOffsetPx.value)
}

// ─── Lifecycle ─────────────────────────────────────────────────────────────────

onMounted(() => {
    startAnimation(0)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup',   handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend',  handleTouchEnd)
})

onUnmounted(() => {
    anim?.cancel()
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup',   handleMouseUp)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend',  handleTouchEnd)
})
</script>