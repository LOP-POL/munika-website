<template>
    <head-and-c>
        <template #title>Featured Sponsors and Partners</template>
        <div
            ref="marqueeEl"
            class="marquee"
            role="region"
            aria-label="Sponsors and partners. Swipe or drag to browse."
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerUp"
            @pointercancel="handlePointerUp"
            @pointerenter="handlePointerEnter"
            @pointerleave="handlePointerLeave"
        >
            <div ref="marqueeTrack" class="marquee-track">
                <div class="marquee-group">
                    <CollabCard v-for="(collab, index) in collabs" :key="`primary-${index}`" :data="collab" />
                </div>
                <div class="marquee-group" aria-hidden="true" inert>
                    <CollabCard v-for="(collab, index) in collabs" :key="`duplicate-${index}`" :data="collab" />
                </div>
            </div>
        </div>
        <p class="marquee-hint">Drag or swipe to browse; select a card to visit a partner.</p>
    </head-and-c>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import CollabCard from "./collabCard.vue";
import type { Collab } from "~/dataTypes/DT.js";

const props = defineProps<{ collabsData: Collab[] }>();
const marqueeEl = ref<HTMLElement | null>(null);
const marqueeTrack = ref<HTMLElement | null>(null);
const collabs = ref<Collab[]>([]);
const isDragging = ref(false);
const startX = ref(0);
const dragStartPx = ref(0);
const currentOffsetPx = ref(0);
let anim: Animation | null = null;
let activePointerId: number | null = null;
let dragged = false;
let resizeObserver: ResizeObserver | null = null;

const DURATION_MS = 60_000;

watch(
    () => props.collabsData,
    async (data) => {
        collabs.value = data ?? [];
        await nextTick();
        anim?.cancel();
        if (marqueeTrack.value) {
            marqueeTrack.value.style.transform = "";
            startAnimation();
        }
    },
    { immediate: true },
);

function halfWidth(): number {
    const firstGroup = marqueeTrack.value?.firstElementChild as HTMLElement | null;
    return firstGroup?.getBoundingClientRect().width ?? 0;
}

function startAnimation(fromPx = 0): void {
    if (!marqueeTrack.value || collabs.value.length < 1) return;
    const width = halfWidth();
    if (width <= 0) return;

    const offset = ((fromPx % width) + width) % width;
    const start = offset === 0 ? 0 : offset - width;
    const distance = width - Math.abs(start);
    anim = marqueeTrack.value.animate(
        [
            { transform: `translateX(${start}px)` },
            { transform: `translateX(${-width}px)` },
        ],
        {
            duration: DURATION_MS * (distance / width),
            easing: "linear",
            fill: "forwards",
        },
    );
    anim.addEventListener("finish", () => startAnimation(), { once: true });
}

function captureOffset(): number {
    if (!marqueeTrack.value || !marqueeEl.value || !anim) return currentOffsetPx.value;
    anim.pause();
    const offset = marqueeTrack.value.getBoundingClientRect().left - marqueeEl.value.getBoundingClientRect().left;
    marqueeTrack.value.style.transform = `translateX(${offset}px)`;
    currentOffsetPx.value = offset;
    anim.cancel();
    return offset;
}

function handlePointerEnter(): void {
    if (!isDragging.value) anim?.pause();
}

function handlePointerLeave(): void {
    if (!isDragging.value) {
        const offset = captureOffset();
        startAnimation(offset);
    }
}

function handlePointerDown(event: PointerEvent): void {
    if (event.button !== 0 || (event.target as HTMLElement).closest("a, button")) return;
    activePointerId = event.pointerId;
    startX.value = event.clientX;
    dragStartPx.value = captureOffset();
    isDragging.value = true;
    dragged = false;
    marqueeEl.value?.setPointerCapture(event.pointerId);
}

function handlePointerMove(event: PointerEvent): void {
    if (!isDragging.value || event.pointerId !== activePointerId || !marqueeTrack.value) return;
    const delta = event.clientX - startX.value;
    if (Math.abs(delta) > 4) dragged = true;
    if (!dragged) return;

    const width = halfWidth();
    if (!width) return;
    currentOffsetPx.value = ((dragStartPx.value + delta) % width + width) % width - width;
    marqueeTrack.value.style.transform = `translateX(${currentOffsetPx.value}px)`;
    event.preventDefault();
}

function handlePointerUp(event: PointerEvent): void {
    if (!isDragging.value || event.pointerId !== activePointerId) return;
    isDragging.value = false;
    activePointerId = null;
    if (dragged) startAnimation(currentOffsetPx.value);
    else startAnimation(dragStartPx.value);
}

onMounted(() => {
    startAnimation();
    if (marqueeTrack.value) {
        resizeObserver = new ResizeObserver(() => {
            const offset = isDragging.value ? currentOffsetPx.value : captureOffset();
            anim?.cancel();
            startAnimation(offset);
        });
        resizeObserver.observe(marqueeTrack.value);
    }
});

onUnmounted(() => {
    anim?.cancel();
    resizeObserver?.disconnect();
});
</script>

<style scoped>
.marquee {
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    background: #f8fafc;
    cursor: grab;
    touch-action: pan-y;
    user-select: none;
}

.marquee:active {
    cursor: grabbing;
}

.marquee-track {
    display: flex;
    width: max-content;
    will-change: transform;
}

.marquee-group {
    display: flex;
    flex: 0 0 auto;
    align-items: stretch;
    gap: clamp(0.75rem, 2vw, 1.5rem);
    padding: 1rem clamp(0.75rem, 2vw, 1.5rem);
}

.marquee-hint {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 0.9rem;
    text-align: center;
}
</style>
