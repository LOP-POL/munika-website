<template>
  <head-and-c :divider="true" :col-form="true">
    <template #title>What to expect</template>
    <head-and-c :inner="true" :row-form="true">
      <template #title></template>
      <div class="videoPart" ref="videoPart">
        <video controls :width="vidCont?.offsetWidth" muted loading="lazy" ref="videoRef">
          <source src="/videos/KAMUN_2022_Promotion_Video (1).mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <br />
      <div class="vidSumCont" ref="vidCont" :style="{ height: videoPart?.clientHeight }">
        <p class="vidSummary" ref="vidSummary1"
           @mouseover="handleVideoClicks(backGroundImages.food,29,$event)" @click="handleVideoClicks(backGroundImages.food, 29, $event)">
          Enjoy delicious food served throughout the conference, with a variety of options to suit every taste and dietary need.
        </p>
        <p class="vidSummary" ref="vidSummary2"
           @mouseover="handleVideoClicks(backGroundImages.bau,24,$event)" @click="handleVideoClicks(backGroundImages.bau, 24, $event)">
          Experience our sessions in beautiful venues at the Karlsruhe Institute of Technology, offering a unique and inspiring atmosphere.
        </p>
        <p class="vidSummary" ref="vidSummary3"
           @mouseover="handleVideoClicks(backGroundImages.schloss,34,$event)" @click="handleVideoClicks(backGroundImages.schloss, 34, $event)">
          Take part in unforgettable socials, where you can connect, network, and have fun with fellow delegates from around the world.
        </p>
      </div>
      <el-tooltip v-if="tooltipVisible" content="Click or hover" placement="bottom" effect="dark">
        <div ref="tooltipRef" style="width:fit-content; margin:0 auto; font-size:1.2em; color:var(--theme-color); font-weight:bold;">
          Click or hover
        </div>
      </el-tooltip>
    
    </head-and-c>
    <el-divider></el-divider>
    <head-and-c :inner="true">
      <template #title>
        Want to contact or sponsor us ?
      </template>
     
    <p>
        Send us an email at  <a href="mailto:vorstand@munika.org">vorstand@munika.org</a>
    </p>
     <p>Follow us on <a href="https://www.instagram.com/munika_ev?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">instagram</a>
        for all the newest updates regarding the conference.<br />
    </p>
     
      <p>Incase you prefer a more personal approach come to our meetings at 7 pm especially if you intend to join</p>
      <br/>
      <Calendar />
    </head-and-c>
  </head-and-c>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Calendar from './Calendar.vue'

const tooltipVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const vidSummary1 = ref<HTMLElement | null>(null)
const vidSummary2 = ref<HTMLElement | null>(null)
const vidSummary3 = ref<HTMLElement | null>(null)
const vidCont = ref<HTMLElement | null>(null)
const videoPart = ref<HTMLElement | null>(null)

const backGroundImages = ref<Record<string, string>>({
  food: '/img/pictureOfFood.JPG',
  bau: '/img/pictureMatheBau.JPG',
  schloss: '/img/pictureInSchloss.JPG',
})

function handleVideoClicks(img: string, time: number, e: Event) {
  if (vidCont.value) {
    vidCont.value.style.backgroundImage = `url(${img})`
  }
  if (videoRef.value) {
    videoRef.value.currentTime = time
    videoRef.value.play()
  }
}

onMounted(() => {
  // Tooltip intersection observer
  if (tooltipRef.value) {
    const tooltipObserver = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        tooltipVisible.value = entry.isIntersecting
      })
    }, { threshold: 0.2 })
    tooltipObserver.observe(tooltipRef.value)
  }
})
</script>

<style scoped>
.videoPart,
.vidSumCont {
    border-radius: 20px;
    margin: 20px;
    padding: 0;
    width: 40vw;
    margin:0;
}

.videoPart video {
   object-fit: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    border-radius: 20px;
    width:40vw;
}

.vidSumCont {
    background-image: url("/img/pictureInSchloss.jpg");
    background-position: center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
   
}

@media screen and (max-width:900px) {
  .videoPart video{
        width:70vw;
   }
    .vidSumCont {
        width: 90%;
    }
}

.vidSummary {
    border-left: 10px solid var(--theme-color);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    padding: 10px;
    margin: 10px;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.00) 100%);
    backdrop-filter: blur(5px);
    color: white;
}

.vidSummary:nth-child(1) {
    border-left: 10px solid var(--special-green);
}

.vidSummary:nth-child(2) {
    border-left: 10px solid var(--special-yellow);
}

.vidSummary:nth-child(3) {
    border-left: 10px solid var(--special-red);
}

.vidSummary:hover {
    transform: scale(1.25);
}

.highlight-scale {
    transform: scale(1.25) !important;
    transition: transform 0.3s;
    z-index: 2;
}
</style>
