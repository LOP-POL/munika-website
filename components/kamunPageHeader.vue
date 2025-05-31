<template>
    <section class="container-home container-home-main" ref="headerRef">
        <div class="left-side layered-content" ref="leftRef">
            <div class="kamun-title">
                <h1 class="show-text kamun-title-text">KAMUN 2025</h1>
                <p class="title-sub-text">Karlsruhe Model United Nations</p>
            </div>
        </div>
        <div class="layered-content underlay-kamun" ref="underlayRef">
            <div class="overlay-content">
                <h2>The Black Forest Summit</h2>
            </div>
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
  if (!leftRef.value || !underlayRef.value) return

  const clientX = 'clientX' in e ? e.clientX : 0
  const p = clientX / window.innerWidth * 100

  leftRef.value.style.width = `${p}%`
  underlayRef.value.style.width = `${p}%`
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
    .underlay-kamun{
        z-index: 2;
        background-color:var(--theme-color);
        opacity: 0.7;
         background-image: url("/styleImgs/forest-silouette-yellow.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    }

    .container-home{
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100vh;
    width:100%;
    border-radius:10px;
}
    .kamun-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .kamun-title-text {
        font-size: 2.5em;
        font-weight: bold;
        color: white;
        margin: 0;
    }
    .title-sub-text {
        font-size: 1.2em;
        color: white;
        margin: 0;
    }
    .overlay-content {
        display: flex;
        flex-direction: row;
        align-items:flex-end;
        justify-content:flex-end;
        height: 100%;
    }
</style>



