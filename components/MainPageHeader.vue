<style>
    .layered-content{
    position: absolute;
    width:100%;
    height:100%;
    overflow: hidden;
    display: grid;
    place-items:center;
    border-radius:10px;
   
}
.right-side{
  background-image: url("/img/United_Nations_General_Assembly_Hall_(3).webp");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

   
}
.left-side{
    background: radial-gradient(var(--seasalt) 8%,transparent 8%);
    background-position: 0% 0%;
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
    z-index:3;
   
    left:0;
    transition: ease 0.5ms;
 }
 .underlay-munika{
    z-index: 2;
    background-color:var(--pacific-cyan);
    opacity: 0.7;
 }
    .container-home{
        border-radius:10px;
    }
   
</style>
<template>
    <section class="container-home container-home-main" ref="headerRef">
        <div class="left-side layered-content" ref="leftRef">
            <h1 class="show-text">Model United Nations Initiative Karlsruhe</h1>
        </div>
        <div class="layered-content underlay-munika" ref="underlayRef">

        </div>
        <div class="right-side layered-content">

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Define refs for DOM elements
const leftRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const underlayRef = ref<HTMLElement | null>(null)

const handleMove = (e: MouseEvent | Touch) => {
  if (!leftRef.value) return
  const clientX = 'clientX' in e ? e.clientX : 0
  const p = clientX / window.innerWidth * 100
  leftRef.value.style.width = `${p}%`

  if (underlayRef.value) {
    underlayRef.value.style.width = `${p}%`
  }
}

const onMouseMove = (e: MouseEvent) => handleMove(e)
const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length > 0) handleMove(e.touches[0])
}

onMounted(() => {
  if (headerRef.value) {
    headerRef.value.addEventListener('mousemove', onMouseMove)
    headerRef.value.addEventListener('touchmove', onTouchMove)
  }
})

onUnmounted(() => {
  if (headerRef.value) {
    headerRef.value.removeEventListener('mousemove', onMouseMove)
    headerRef.value.removeEventListener('touchmove', onTouchMove)
  }
})
</script>