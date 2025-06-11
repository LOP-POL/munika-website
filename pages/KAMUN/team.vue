
<script lang="ts" setup>
import headAndC from '~/components/headAndC.vue'
definePageMeta({ layout: 'kamun-bar' })
const vorstandPictures: string[] = ["Leon", "Varshi", "anuAndVarshi"]
const academicsPictures: string[] = ["Maria", "Mahima", "Arga"]
const foodSocialsPictures: string[] = ["Karan", "Ruben", "Silke"]
const delegatesPictures: string[] = ["Ansh", "Joshua", "mary"]
</script>
<template>
  <head-and-c divider>
    <template #title>Meet the KAMUN 2025 Teams</template>
    Welcome to the KAMUN 2025 team page! Here you can get to know the dedicated members who make this conference possible, from our board to the teams handling academics, food & socials, and our amazing delegates.
  </head-and-c>

  <!-- Vorstand (Board) -->
  <head-and-c divider>
    <template #title>Vorstand</template>
    The Vorstand (Board) oversees the organization and vision of KAMUN, ensuring everything runs smoothly and our values are upheld.
  </head-and-c>
  <el-container>
    <el-main style="background-color:black;" class="carousel-container">
      <el-carousel type="card" height="500px" :autoplay="false" motion-blur arrow="hover">
        <el-carousel-item v-for="item in vorstandPictures" :key="item" style="border:solid 2px black;">
          <el-card shadow="hover" class="people-card">
            <template #header>
              <span>{{ item }}</span>
            </template>
            <img class="card-img" :src="`/img/${item}.jpg`" :alt="item" />
            <template #footer>
              <p>
                Dedicated to leading KAMUN with passion and integrity.
              </p>
            </template>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>

  <!-- Academics Team -->
  <head-and-c divider>
    <template #title>Academics Team</template>
    The Academics Team curates the topics, prepares study guides, and supports delegates in all academic matters throughout the conference.
  </head-and-c>
  <el-container>
    <el-main style="background-color:black;" class="carousel-container">
      <el-carousel type="card" height="500px" :autoplay="false" motion-blur arrow="hover">
        <el-carousel-item v-for="item in academicsPictures" :key="item" style="border:solid 2px black;">
          <el-card shadow="hover" class="people-card">
            <template #header>
              <span>{{ item }}</span>
            </template>
            <img class="card-img" :src="`/img/${item}.jpg`" :alt="item" />
            <template #footer>
              <p>
                Ensuring a high-quality academic experience for all participants.
              </p>
            </template>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>

  <!-- Food & Socials Team -->
  <head-and-c divider>
    <template #title>Food & Socials Team</template>
    The Food & Socials Team organizes all meals, social events, and ensures everyone has a great time outside of committee sessions.
  </head-and-c>
  <el-container>
    <el-main style="background-color:black;" class="carousel-container">
      <el-carousel type="card" height="500px" :autoplay="false" motion-blur arrow="hover">
        <el-carousel-item v-for="item in foodSocialsPictures" :key="item" style="border:solid 2px black;">
          <el-card shadow="hover" class="people-card">
            <template #header>
              <span>{{ item }}</span>
            </template>
            <img class="card-img" :src="`/img/${item}.jpg`" :alt="item" />
            <template #footer>
              <p>
                Bringing everyone together with great food and fun events!
              </p>
            </template>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>

  <!-- Delegates -->
  <head-and-c divider>
    <template #title>Delegates</template>
    Our Delegates are the heart of KAMUN, representing countries, debating, and working together to solve global issues.
  </head-and-c>
  <el-container>
    <el-main style="background-color:black;" class="carousel-container">
      <el-carousel type="card" height="500px" :autoplay="false" motion-blur arrow="hover">
        <el-carousel-item v-for="item in delegatesPictures" :key="item" style="border:solid 2px black;">
          <el-card shadow="hover" class="people-card">
            <template #header>
              <span>{{ item }}</span>
            </template>
            <img class="card-img" :src="`/img/${item}.jpg`" :alt="item" />
            <template #footer>
              <p>
                The driving force of every committee session!
              </p>
            </template>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>
<style></style>
