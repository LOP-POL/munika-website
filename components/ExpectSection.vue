<template>
  <head-and-c :divider="true" :col-form="true">
    <template #title>What to expect</template>
    <head-and-c :inner="true" class="video-container">
      <template #title></template>
      <div class="expect-layout">
        <div class="videoPart">
          <video controls muted preload="metadata" ref="videoRef">
            <source src="/videos/KAMUN_25_promo_video.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="vidSumCont" ref="vidCont">
          <p class="vidSummary" @click="handleVideoClicks(backGroundImages.food)">
            Enjoy delicious food served throughout the conference, with a variety of options to suit every taste and
            dietary need.
          </p>
          <p class="vidSummary" @click="handleVideoClicks(backGroundImages.bau)">
            Experience our sessions in beautiful venues at the Karlsruhe Institute of Technology, offering a unique and
            inspiring atmosphere.
          </p>
          <p class="vidSummary" @click="handleVideoClicks(backGroundImages.schloss)">
            Take part in unforgettable socials, where you can connect, network, and have fun with fellow delegates from
            around the world.
          </p>
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
import { ref, onMounted, watch } from 'vue'
import Calendar from './Calendar.vue'

import type { Collab } from '~/dataTypes/DT.js'

const videoRef = ref<HTMLVideoElement | null>(null)
const vidCont = ref<HTMLElement | null>(null)


const backGroundImages = ref<Record<string, string>>({
  food: '/img/pictureOfFood.JPG',
  bau: '/img/pictureMatheBau.JPG',
  schloss: '/img/pictureInSchloss.JPG',
})


const collabs = ref<Collab[]>([])

const { data: collabsData, error: collabsError, refresh: refreshCollabs } = await useFetch<Collab[]>('/api/collaborations/collabs')

watch(collabsData, (data) => {
  if (data) {
    collabs.value = data
  }
}, { immediate: true })

function handleVideoClicks(img: string) {
  if (vidCont.value) {
    vidCont.value.style.backgroundImage = `url(${img})`
  }
}


onMounted(() => {
  //To set the video to play
  if (vidCont.value) {
    vidCont.value.style.backgroundImage = `url(${backGroundImages.value.schloss})`
  }
  if (videoRef.value) {
    videoRef.value.currentTime = 3
    videoRef.value.pause()
  }

  // Notion-hosted image URLs expire, so refresh them whenever this route is entered.
  void refreshCollabs().then(() => {
    if (collabsError.value) {
      console.error('Failed to refresh collaborations', collabsError.value)
    }
  })

})

</script>

<style scoped>
.expect-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  align-items: stretch;
  gap: clamp(1rem, 2.5vw, 2rem);
  width: 100%;
}

.videoPart,
.vidSumCont {
  border-radius: 20px;
  min-width: 0;
}

.videoPart video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #111;
  border-radius: 20px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
}

.vidSumCont {
  min-height: 100%;
  background-image: url("/img/pictureInSchloss.JPG");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  padding: clamp(0.75rem, 2vw, 1.25rem);
}

.video-container {
  background: radial-gradient(var(--french-gray) 8%, transparent 8%) 0% 0% / 5vmin 5vmin repeat;
}

@media screen and (max-width:900px) {
  .expect-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .vidSummary {
    font-size: 1rem;
  }
}

.vidSummary {
  border-left: 5px solid var(--theme-color);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
  padding: 10px;
  margin: 10px;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.00) 100%);
  backdrop-filter: blur(5px);
  color: white;
}

.vidSummary:nth-child(1) {
  border-left-color: var(--special-green);
}

.vidSummary:nth-child(2) {
  border-left-color: var(--special-yellow);
}

.vidSummary:nth-child(3) {
  border-left-color: var(--special-red);
}

.vidSummary:hover {
  transform: translateX(4px);
}

.highlight-scale {
  transform: scale(1.25) !important;
  transition: transform 0.3s;
  z-index: 2;
}

</style>
