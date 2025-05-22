<template>
    <section class="container-home container-home-main" ref="headerRef">
                <div class="left-side layered-content" ref="leftRef">
                    <h1 class="show-text">Model United Nations Initiative Karlsruhe</h1>
                </div>
                 <div class="left-side layered-content" ref="leftRef">
                    
                </div>
                <div class="right-side layered-content">
                    
                </div>
    </section>
    <section class="container-home container-home-text">
       <h1>
            what do we do
       </h1>
       <h1>
        who are we 
       </h1>
    </section>
    <section class="container-home container-home-contacts">
        <h1>
           Join us
        </h1>
    </section>

</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Define refs for DOM elements
const leftRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const handleMove = (e: MouseEvent | Touch) => {
  if (!leftRef.value) return
  const clientX = 'clientX' in e ? e.clientX : 0
  const p = clientX / window.innerWidth * 100
  leftRef.value.style.width = `${p}%`
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