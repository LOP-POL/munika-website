<template>
  <head-and-c :divider="true" :col-form="true">
    <template #title>What to expect</template>
    <head-and-c :inner="true" class="video-container">
      <template #title></template>
      <div ref="expectRoot" class="expect-content">
        <div class="videoPart">
          <div class="video-frame">
            <video controls muted preload="metadata" ref="videoRef">
              <source src="/videos/KAMUN_25_promo_video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div class="expect-rows">
          <article v-for="(card, i) in expectationCards" :key="card.title" class="expect-row"
            :class="{ 'is-reversed': i % 2 === 1 }" :style="{ '--accent': card.accent }">
            <div class="expect-card">
              <span class="expect-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="expect-title">{{ card.title }}</h3>
              <p>{{ card.text }}</p>
            </div>

            <div class="expect-media">
              <span class="expect-accent" aria-hidden="true"></span>
              <div class="expect-frame">
                <img class="expect-img" :src="card.image" :alt="card.alt" loading="lazy">
              </div>
            </div>
          </article>
        </div>
      </div>

    </head-and-c>

    <el-divider></el-divider>
    <head-and-c :inner="true">
      <template #title>
        Want to contact or sponsor us ?
      </template>

      <p>
        Send us an email at <a href="mailto:vorstand@munika.org">vorstand@munika.org</a>
      </p>
      <p>Follow us on <a
          href="https://www.instagram.com/munika_ev?utm_source=ig_web_button_share_sheet&xtok=ZDNlZDc0MzIxNw==">instagram</a>
        for all the newest updates regarding the conference.<br />
      </p>

      <p>Incase you prefer a more personal approach come to our meetings at 7 pm especially if you intend to join</p>
      <br />
      <div v-if="collabs.length > 0" class="not-show" style="display: contents;">
          <MarqueeSec :collabs-data="collabs"/>
      </div>


    </head-and-c>

    <head-and-c>
      <Calendar />
    </head-and-c>

  </head-and-c>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Calendar from './Calendar.vue'

import type { Collab } from '~/dataTypes/DT.js'

const videoRef = ref<HTMLVideoElement | null>(null)
const expectRoot = ref<HTMLElement | null>(null)
const expectationCards = [
  {
    title: 'Food',
    text: 'Enjoy delicious food served throughout the conference, with a variety of options to suit every taste and dietary need.',
    image: '/img/pictureOfFood.JPG',
    alt: 'Food served at the conference',
    accent: 'var(--special-green)',
  },
  {
    title: 'Venues',
    text: 'Experience our sessions in beautiful venues at the Karlsruhe Institute of Technology, offering a unique and inspiring atmosphere.',
    image: '/img/pictureMatheBau.JPG',
    alt: 'A venue at the Karlsruhe Institute of Technology',
    accent: 'var(--special-yellow)',
  },
  {
    title: 'Socials',
    text: 'Take part in unforgettable socials, where you can connect, network, and have fun with fellow delegates from around the world.',
    image: '/img/pictureInSchloss.JPG',
    alt: 'A social event at the palace',
    accent: 'var(--special-red)',
  },
]


const collabs = ref<Collab[]>([])

const { data: collabsData, error: collabsError, refresh: refreshCollabs } = await useFetch<Collab[]>('/api/collaborations/collabs')
let ctx: gsap.Context | null = null

watch(collabsData, (data) => {
  if (data) {
    collabs.value = data
  }
}, { immediate: true })

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  if (videoRef.value) {
    videoRef.value.currentTime = 3
    videoRef.value.pause()
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && expectRoot.value) {
    ctx = gsap.context(() => {
      // Video: rises in, with its offset frame sliding into place
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: expectRoot.value!.querySelector('.videoPart'), start: 'top 82%', toggleActions: 'play none none reverse' },
        })
        .from('.video-frame', { y: 50, scale: 0.94, opacity: 0, duration: 0.9 })
        .from('.video-frame', { '--frame-shift': '0px', duration: 0.8 }, '-=0.4')

      // Each row: text card and picture enter from opposite sides, like the join page
      gsap.utils.toArray<HTMLElement>('.expect-row', expectRoot.value!).forEach((row) => {
        const reversed = row.classList.contains('is-reversed')
        const dir = reversed ? 1 : -1
        const q = gsap.utils.selector(row)

        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
          .from(q('.expect-card'), { x: 70 * dir, opacity: 0, duration: 0.5 })
          .from(q('.expect-index'), { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
          .from(q('.expect-title, .expect-card p'), { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '<0.1')
          .from(q('.expect-frame'), { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.inOut' }, '-=0.9')
          .from(q('.expect-img'), { scale: 1.3, duration: 0.9 }, '<')
          .from(q('.expect-accent'), { scale: 0, rotate: -40, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' }, '-=0.7')

        // gentle parallax on the picture while scrolling
        gsap.fromTo(
          q('.expect-img'),
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    }, expectRoot.value)

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  // Notion-hosted image URLs expire, so refresh them whenever this route is entered.
  void refreshCollabs().then(() => {
    if (collabsError.value) {
      console.error('Failed to refresh collaborations', collabsError.value)
    }
  })

})

onBeforeUnmount(() => {
  ctx?.revert()
})

</script>

<style scoped>
/*
  main.css has `* { transition: 0.5s ease }`; anything GSAP animates opts out so tweens stay crisp.
*/
.video-frame,
.expect-card,
.expect-index,
.expect-title,
.expect-card p,
.expect-frame,
.expect-img,
.expect-accent {
  transition: none;
}

.expect-content {
  width: 100%;
}

/* ---------- Video: ~60% of the page width, centred ---------- */
.videoPart {
  width: min(100%, 60vw);
  margin: 0 auto clamp(3rem, 7vw, 5.5rem);
}

.video-frame {
  --frame-shift: 14px;
  position: relative;
  isolation: isolate;
}

/* offset accent frame behind the video */
.video-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 18px;
  background: var(--theme-color);
  opacity: 0.85;
  transform: translate(var(--frame-shift), var(--frame-shift));
}

.videoPart video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #111;
  border-radius: 16px;
  box-shadow: 0 14px 34px rgba(33, 33, 33, .24);
}

.video-container {
  background: radial-gradient(var(--french-gray) 8%, transparent 8%) 0% 0% / 5vmin 5vmin repeat;
}

/* ---------- Rows: text card + picture, alternating sides ---------- */
.expect-rows {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 7vw, 5rem);
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 0 0.5rem 1rem;
  box-sizing: border-box;
}

.expect-row {
  --accent: var(--theme-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1.5rem, 4vw, 4rem);
}

.expect-row.is-reversed {
  flex-direction: row-reverse;
}

.expect-card {
  position: relative;
  flex: 1 1 42%;
  min-width: 0;
  padding: clamp(1.25rem, 2.8vw, 2.25rem);
  border-radius: 14px;
  border-top: 5px solid var(--accent);
  background: var(--seasalt);
  box-shadow: 0 10px 28px rgba(33, 33, 33, .14);
  box-sizing: border-box;
}

.expect-index {
  display: block;
  margin-bottom: 0.35rem;
  font-family: 'Georgia', 'Times New Roman', Times, serif;
  font-style: italic;
  font-size: 2.4rem;
  line-height: 1;
  color: var(--accent);
}

.expect-title {
  margin: 0 0 0.6rem;
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  font-weight: 700;
  color: #2d3748;
}

.expect-card p {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.65;
  color: #4a5568;
}

/* picture side: framed photo with a coloured shape peeking out behind it */
.expect-media {
  position: relative;
  flex: 1 1 52%;
  min-width: 0;
}

.expect-accent {
  position: absolute;
  width: 46%;
  aspect-ratio: 1;
  right: -5%;
  bottom: -9%;
  z-index: 0;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.85;
}

.is-reversed .expect-accent {
  right: auto;
  left: -5%;
}

.expect-frame {
  position: relative;
  z-index: 1;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  border: 4px solid var(--seasalt);
  box-shadow: 0 14px 34px rgba(0, 0, 0, .22);
}

/* taller than its frame so the parallax never reveals a gap */
.expect-img {
  position: absolute;
  top: -7.5%;
  left: 0;
  display: block;
  width: 100%;
  height: 115%;
  object-fit: cover;
  will-change: transform;
}

/* ---------- Small screens ---------- */
@media screen and (max-width: 900px) {
  .videoPart {
    width: 100%;
  }

  .video-frame {
    --frame-shift: 8px;
  }

  .expect-row,
  .expect-row.is-reversed {
    flex-direction: column-reverse; /* picture first, then the text card */
    align-items: stretch;
    gap: 1.5rem;
  }

  .expect-media {
    flex: none;
    width: 100%;
  }

  .expect-accent {
    width: 38%;
    right: -2%;
    bottom: -6%;
  }

  .is-reversed .expect-accent {
    left: -2%;
  }

  .expect-card {
    flex: none;
  }
}
</style>
