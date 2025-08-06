<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import headAndC from '~/components/headAndC.vue'
import TiltCard from '~/components/TiltCard.vue'
definePageMeta({ layout: 'kamun-bar' })

const { data } = useFetch('/api/teams/teams')
interface TeamMember {
  name: string,
  nickname: string,
  instagramNickname: string,
  picture: string,
}
const teams = ref<Record<string, TeamMember[]>>()
const loading = ref<boolean>(true)

watchEffect(() => {
  if (data.value) {
    teams.value = data.value
    loading.value = false
  } else {
    loading.value = true
  }
})

// Responsive carousel type
const carouselType = ref("default")
function updateCarouselType() {
  carouselType.value = window.innerWidth < 900 ? 'default' : 'card'
}

onMounted(()=>{
  carouselType.value = window.innerWidth <900?'default' :'card'
  window.addEventListener('resize', updateCarouselType)
})
</script>

<template>
  <head-and-c divider picture pictureUrl="/styleImgs/teamPictureBW.jpg">
    <template #title>
      <span class="animated-title">
        <svg class="pulse-dot" width="16" height="16"><circle cx="8" cy="8" r="7" fill="var(--theme-color)" /></svg>
        Meet the KAMUN 2025 Teams
      </span>
    </template>
    Welcome to the KAMUN 2025 team page! Here you can get to know the dedicated members who make this conference possible, from our board to the teams handling academics, food & socials, and our amazing delegates.
  </head-and-c>

  <div v-if="loading" class="skeleton-loader">
    <div class="skeleton-card" v-for="n in 3" :key="n">
      <div class="skeleton-img"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  </div>

  <template v-else>
    <!-- Vorstand (Board) -->
    <head-and-c divider>
      <template #title>Vorstand</template>
      The Vorstand (Board) oversees the organization and vision of KAMUN, ensuring everything runs smoothly and our values are upheld.
    </head-and-c>
    <el-container>
      <el-main style="background-color:black;" class="carousel-container">
        <el-carousel v-if="teams?.vorstand" :type="carouselType" height="500px" :autoplay="false" motion-blur arrow="hover">
          <el-carousel-item
            v-for="member in teams.vorstand"
            :key="member.name"
            style="border-radius: 1.6rem;"
          >
            <TiltCard :member="member" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>

    <el-divider></el-divider>
    <!-- Academics Team -->
    <head-and-c divider>
      <template #title>Academics Team</template>
      The Academics Team curates the topics, prepares study guides, and supports delegates in all academic matters throughout the conference.
    </head-and-c>
    <el-container>
      <el-main style="background-color:black;" class="carousel-container">
        <el-carousel v-if="teams?.academics" :type="carouselType" height="500px" :autoplay="false" motion-blur arrow="hover">
          <el-carousel-item
            v-for="member in teams.academics"
            :key="member.name"
            style="border-radius: 1.6rem;"
          >
            <TiltCard :member="member" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>

    <el-divider></el-divider>
    <!-- Food & Socials Team -->
    <head-and-c divider>
      <template #title>Food & Socials Team</template>
      The Food & Socials Team organizes all meals, social events, and ensures everyone has a great time outside of committee sessions.
    </head-and-c>
    <el-container>
      <el-main style="background-color:black;" class="carousel-container">
        <el-carousel v-if="teams?.foodsocials" :type="carouselType" height="500px" :autoplay="false" motion-blur arrow="hover">
          <el-carousel-item
            v-for="member in teams.foodsocials"
            :key="member.name"
            style="border-radius: 1.6rem;"
          >
            <TiltCard :member="member" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>

    <el-divider></el-divider>
    <!-- Delegates -->
    <head-and-c divider>
      <template #title>Delegates</template>
      Our Delegates are the heart of KAMUN, representing countries, debating, and working together to solve global issues.
    </head-and-c>
    <el-container>
      <el-main style="background-color:black;" class="carousel-container">
        <el-carousel v-if="teams?.delegates" :type="carouselType" height="500px" :autoplay="false" motion-blur arrow="hover">
          <el-carousel-item
            v-for="member in teams.delegates"
            :key="member.name"
            style="border-radius: 1.6rem;"
          >
            <TiltCard :member="member" />
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
  </template>
</template>

<style>
  .wrap {
  margin: 2rem;

  transform-style: preserve-3d;
  transform: perspective(100rem);

  cursor: pointer;
}

.container {
  --rX: 0;
  --rY: 0;
  --bX: 50%;
  --bY: 80%;

  width: 30rem;
  height: 36rem;
  border: 1px solid var(--background-color);
  border-radius: 1.6rem;
  padding: 4rem;

  display: flex;
  align-items: flex-end;

  position: relative;
  transform: rotateX(calc(var(--rX) * 1deg)) rotateY(calc(var(--rY) * 1deg));

  background: linear-gradient(hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1)),;
  background-position: var(--bX) var(--bY);
  background-size: 40rem auto;
  box-shadow: 0 0 3rem .5rem hsla(0, 0%, 0%, .2);

  transition: transform .6s 1s;
}
/*  url("https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9") */
.container::before,
.container::after {
  content: "";

  width: 2rem;
  height: 2rem;
  border: 1px solid #fff;

  position: absolute;
  z-index: 2;

  opacity: .3;
  transition: .3s;
}

.container::before {
  top: 2rem;
  right: 2rem;

  border-bottom-width: 0;
  border-left-width: 0;
}

.container::after {
  bottom: 2rem;
  left: 2rem;

  border-top-width: 0;
  border-right-width: 0;
}

.container--active {
  transition: none;
}

.container p {
  color: hsla(0, 0%, 100%, .6);
  font-size: 2.2rem;
}

.wrap:hover .container::before,
.wrap:hover .container::after {
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
}

.container::before {
  top: 2rem;
  right: 2rem;

  border-bottom-width: 0;
  border-left-width: 0;
}

.container::after {
  bottom: 2rem;
  left: 2rem;

  border-top-width: 0;
  border-right-width: 0;
}

.container--active {
  transition: none;
}

.container p {
  color: hsla(0, 0%, 100%, .6);
  font-size: 2.2rem;
}

.wrap:hover .container::before,
.wrap:hover .container::after {
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
}

.animated-title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: bold;
  font-size: 2em;
}
.pulse-dot {
  animation: pulse 1.2s infinite;
}
@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
.skeleton-loader {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0;
}
.skeleton-card {
  background: #eee;
  border-radius: 1.6rem;
  width: 300px;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 3rem .5rem hsla(0, 0%, 0%, .1);
  animation: skeleton-fade 1.5s infinite alternate;
}
@keyframes skeleton-fade {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
.skeleton-img {
  width: 80%;
  height: 180px;
  background: #ccc;
  border-radius: 10px;
  margin: 2rem 0 1rem 0;
}
.skeleton-lines {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.skeleton-line {
  height: 18px;
  background: #ddd;
  border-radius: 5px;
  width: 100%;
}
.skeleton-line.short {
  width: 60%;
}
</style>

