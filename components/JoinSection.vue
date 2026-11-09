<!--
  JoinSection.vue
  Feature section built specially for join.vue: text card + two photos + one SVG graphic.
  Shares the look of head-and-c (seasalt card, french-gray title) but is a flex/grid
  friendly, transparent-background block so the scroll "streak" can run behind it.
-->
<template>
  <section ref="rootRef" class="join-section" :class="{ 'is-reversed': reverse }" data-streak-section>
    <div ref="cardRef" class="js-card">
      <h1 class="js-title">
        <slot name="title"></slot>
      </h1>
      <div class="js-content">
        <slot></slot>
      </div>
    </div>

    <div class="js-media">
      <img ref="imgARef" class="js-img js-img-a" :src="imageA" :alt="altA" loading="lazy" />
      <img ref="imgBRef" class="js-img js-img-b" :src="imageB" :alt="altB" loading="lazy" />
      <img ref="graphicRef" class="js-graphic" :src="graphic" alt="" aria-hidden="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
  imageA: string
  imageB: string
  graphic: string
  altA?: string
  altB?: string
  reverse?: boolean
}>()

const rootRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const imgARef = ref<HTMLElement | null>(null)
const imgBRef = ref<HTMLElement | null>(null)
const graphicRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null
const refreshTriggers = () => ScrollTrigger.refresh()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  const images = [imgARef.value, imgBRef.value, graphicRef.value]
  images.forEach((image) => image?.addEventListener('load', refreshTriggers))

  ctx = gsap.context(() => {
    const dir = props.reverse ? 1 : -1

    gsap.set(cardRef.value, { x: 70 * dir, autoAlpha: 0 })
    gsap.set(imgARef.value, { y: 80, rotate: -5 * dir, autoAlpha: 0 })
    gsap.set(imgBRef.value, { y: 100, rotate: 6 * dir, autoAlpha: 0 })
    gsap.set(graphicRef.value, { scale: 0.3, rotate: -25, autoAlpha: 0 })

    // Reveal all section content from one trigger so it stays in sync.
    gsap
      .timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        scrollTrigger: {
          trigger: rootRef.value,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })
      .to(cardRef.value, { x: 0, autoAlpha: 1 })
      .to(imgARef.value, { y: 0, rotate: 0, autoAlpha: 1 }, '-=0.4')
      .to(imgBRef.value, { y: 0, rotate: 0, autoAlpha: 1 }, '-=0.4')
      .to(
        graphicRef.value,
        { scale: 1, rotate: 0, autoAlpha: 1, ease: 'back.out(1.8)' },
        '-=0.4'
      )

  }, rootRef.value as Element)

  requestAnimationFrame(refreshTriggers)
})

onBeforeUnmount(() => {
  for (const image of [imgARef.value, imgBRef.value, graphicRef.value]) {
    image?.removeEventListener('load', refreshTriggers)
  }
  ctx?.revert()
})
</script>

<style scoped>
.join-section {
  position: relative;
  z-index: 1; /* sits above the streak */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 4rem);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 6rem) 1rem;
  box-sizing: border-box;
}

.join-section.is-reversed {
  flex-direction: row-reverse;
}

/* Text card: same look as head-and-c, opaque so text stays readable over the streak */
.js-card {
  flex: 1 1 42%;
  background-color: var(--seasalt);
  padding: clamp(1rem, 2.5vw, 2rem);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.js-title {
  color: var(--french-gray);
  margin-bottom: 0.5em;
  text-align: left;
  font-size: 2rem;
}

.js-content {
  text-align: left;
  line-height: 1.6;
}

/* Media cluster: two overlapping photos + a graphic */
.js-media {
  position: relative;
  flex: 1 1 52%;
  min-height: clamp(320px, 38vw, 480px);
}

.js-img {
  position: absolute;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  border: 4px solid var(--seasalt);
  will-change: transform;
}

.js-img-a {
  top: 0;
  left: 0;
  width: 68%;
  height: 70%;
}

.js-img-b {
  bottom: 0;
  right: 0;
  width: 58%;
  height: 62%;
}

.js-graphic {
  position: absolute;
  top: -6%;
  right: 2%;
  width: clamp(70px, 12vw, 150px);
  height: auto;
  z-index: 2;
  will-change: transform;
  pointer-events: none;
}

@media (max-width: 900px) {
  .join-section,
  .join-section.is-reversed {
    flex-direction: column;
    align-items: stretch;
  }

  .js-title {
    font-size: 20px;
  }

  .js-media {
    min-height: 340px;
    width: 100%;
  }
}
</style>
