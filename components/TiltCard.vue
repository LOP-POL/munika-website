<template>
  <div
    class="wrap"
    ref="wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="container" ref="container" :background="`url(${member.picture})`">

        <div class="tilt-image">
            <img :src="member.picture" class="card-img" :alt="member.name" />
        </div>
     
      <div class="tilt-info">
      <p>{{ member.name }}</p>
      <p style="color:var(--theme-color)">aka</p>
      <p>{{ member.nickname }}</p>
      </div>
     
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  member: {
    name: string,
    nickname: string,
    instagramNickname: string,
    picture: string
  }
}>()

const wrap = ref<HTMLElement>()
const container = ref<HTMLElement>()

let tiltEffect = 'normal'
let w = 600
let h = 600

function handleMouseMove(event: MouseEvent) {
  const offsetX = event.offsetX
  const offsetY = event.offsetY
  let X = (-(offsetX - (w / 2)) / 3) / 3
  let Y = ((offsetY - (h / 2)) / 3) / 3

  if (tiltEffect === "reverse") {
    X = ((offsetX - (w / 2)) / 3) / 3
    Y = (-(offsetY - (h / 2)) / 3) / 3
  }
  container.value?.style.setProperty('--rY', X.toFixed(2))
  container.value?.style.setProperty('--rX', Y.toFixed(2))
  container.value?.style.setProperty('--bY', (60 - Number((X / 4).toFixed(2))) + '%')
  container.value?.style.setProperty('--bX', (40 - Number((Y / 4).toFixed(2))) + '%')
}

function handleMouseEnter() {
  container.value?.classList.add("container--active")
}

function handleMouseLeave() {
  container.value?.classList.remove("container--active")
  container.value?.style.setProperty('--rY', "0")
  container.value?.style.setProperty('--rX', "0")
  container.value?.style.setProperty('--bY', '60%')
  container.value?.style.setProperty('--bX', '40%')
}

</script>

<style scoped>
.wrap {
  transform-style: preserve-3d;
  transform: perspective(100rem);
  cursor: pointer;
  width:90%;
  max-width:100%;
  height:90%;
  border-radius:1.6rem;
  margin: none;
 
}
.container {
  --rX: 0;
  --rY: 0;
  --bX: 40%;
  --bY: 60%;
  width:100%;
  height:100%;
  border: 1px solid var(--background-color);
  border-radius: 1.6rem;
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 
  "image info"
  ;
    backdrop-filter: blur(10px);
  position: relative;
  transform: rotateX(calc(var(--rX) * 1deg)) rotateY(calc(var(--rY) * 1deg));
  background: linear-gradient(hsla(0, 100%, 1%, 0.269)), ;
  background-position: var(--bX) var(--bY);
  background-size: cover;
  box-shadow: 0 0 3rem .5rem hsla(0, 0%, 0%, .2);
  transition: transform .6s 1s;

}
/* url("https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9") */
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
  font-size: 1.2rem;
}
.container img{
    border-radius: 1.2rem;
    height:100%;
    width:100%;
}
.container div:nth-child(1){
    height:90%;
    border-radius: 1.2rem;
}
.tilt-img{
     grid-area: image;
     width: 90%;
     height:90%;
     border-radius:1.2rem;
}
.tilt-info{
    grid-area:info;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right:1px solid gray;
    border-top:1px solid gray;
    border-bottom:1px solid gray;
}
img{
    border-radius: 1.2rem;
}

.wrap:hover .container::before,
.wrap:hover .container::after {
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
}
</style>
