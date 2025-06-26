<template>
    <section class="container-home container-home-main" ref="headerRef" v-on:click="openPicture">
         <el-button class="kamun-fab" circle v-on:click="openPicture">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </el-button>
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
        <div class="right-side layered-content" ref="rightSideRef">
            <div v-for="(quote, idx) in quotes" :key="idx" class="quote-text">
                <p>{{ quote }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {  ArrowLeftBold } from '@element-plus/icons-vue'

// Define refs for DOM elements

const quotes = ref([
    "leon is aweseome",
    "the north face",
    "finshs him",
    "but daddy I love him",
    "on please it is not that serious",
    "some more quotes"
])

const { data } = useFetch(`/api/quotes/quotes`)

const leftRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const underlayRef = ref<HTMLElement | null>(null)
const rightSideRef = ref<HTMLElement | null>(null)

const handleMove = (e: MouseEvent | Touch) => {
    if (!leftRef.value || !underlayRef.value ||!toggle) return

    const clientX = 'clientX' in e ? e.clientX : 0
    const p = clientX / window.innerWidth * 100

    leftRef.value.style.width = `${p}%`
    underlayRef.value.style.width = `${p}%`
}

const onScroll = (e: Event) => {
    if (!leftRef.value || !underlayRef.value || !headerRef.value) return

    const headerWidth = headerRef.value?.offsetWidth || 0
   
    //const maxWidth = headerRef.value?.getBoundingClientRect().width

    const scrollPx = window.scrollY
    const size = headerWidth - scrollPx
    if (scrollPx != headerWidth) {
        leftRef.value.style.width = `${(size) / headerWidth * 100}%`
        underlayRef.value.style.width = `${(size) / headerWidth * 100}%`
        underlayRef.value.style.opacity = `${(size) / headerWidth * 100}%`

    }

}

function showQuotes(clear:boolean = true){
    if (!leftRef.value || !underlayRef.value || !headerRef.value) return
        let index = 0;
        const children = rightSideRef.value?.children;

        if (children && children.length > 0) {
            Array.from(children).forEach(child => (child as HTMLElement).style.opacity = "0");
            index = Math.floor(Math.random() * children.length);
            (children[index] as HTMLElement).style.opacity = "1";
           
            setTimeout(()=>{
                (children[index] as HTMLElement).style.opacity = "0";
                showQuotes(false)
            },4000)    
    
}}
const onMouseMove = (e: MouseEvent) => handleMove(e)
const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0])
}

let toggle = true
const openPicture = (e: Event) => {
    toggle = !toggle
    if (!headerRef.value || !leftRef.value || !underlayRef.value ) return
    if (toggle) {
        headerRef.value.addEventListener('mousemove', onMouseMove)
        headerRef.value.addEventListener('touchmove', onTouchMove)
        window.removeEventListener('scroll', onScroll)
        leftRef.value.style.width = `50%`
        underlayRef.value.style.width = `50%`
        underlayRef.value.style.opacity = `50%`
        
    }
    else{
   
    window.addEventListener('scroll', onScroll, { passive: false })
    }
   
}
watchEffect(() => {
   
  if (data.value?.response.results) {
    // if (process.client) {
    //   const jsonData = JSON.stringify(data.value?data.value:"", null, 2);
    //   const blob = new Blob([jsonData], { type: 'application/json' });
    //   const fileUrl = URL.createObjectURL(blob);

    //   // Create a temporary link to trigger download
    //   const link = document.createElement('a');
    //   link.href = fileUrl;
    //   link.download = 'quotes.json';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(fileUrl);
    // }

    
    quotes.value = data.value?.response.results.map((result: any) => (result.properties["quote_text"]?.rich_text?.[0]?.plain_text || ''   
    ));

  }
});
onMounted(() => {
    if (headerRef.value) {
        headerRef.value.addEventListener('mousemove', onMouseMove)
        headerRef.value.addEventListener('touchmove', onTouchMove)
       window.addEventListener('scroll', onScroll, { passive: false })
       showQuotes(false)

    }
})

onUnmounted(() => {
    if (headerRef.value) {
        headerRef.value.removeEventListener('mousemove', onMouseMove)
        headerRef.value.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('scroll', onScroll)

    }
    
})
</script>



<style>
.layered-content {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    place-items: center;
    border-radius: 10px;
}

.right-side {
    background-image: url("/styleImgs/schloss.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
    font-size: 20px;
    font-family: cursive;
    color:white;
}



.right-side > *{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items:center;
    opacity: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0.00) 100%);
    backdrop-filter: blur(2px);
    
}

.left-side {
    background: radial-gradient(var(--seasalt) 8%, transparent 8%);
    background-position: 0% 0%;
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
    z-index: 3;
    left: 0;
    transition: ease 0.5ms;
}

.underlay-kamun {
    z-index: 2;
    /* background-color: var(--theme-color); */

    background-image: url("/styleImgs/forest-silouette-yellow.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(120deg, rgba(255,255,255) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.00) 100%);
    backdrop-filter: blur(20px);

}

.container-home {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    border-radius: 10px;
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
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
}

.kamun-fab {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    background: var(--seasalt);
    color: black;
    font-weight: 500;
    font-size:20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, box-shadow 0.3s;
    z-index: 10;
}

.kamun-fab:hover {
    transform: translateY(-50%) scale(1.5);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}

.quote-text p {
    font-family: 'Georgia', 'Times New Roman', Times, serif;
    font-style: italic;
    font-size: 1.5em;
    color: #fff;
    text-shadow: 1px 1px 8px rgba(0,0,0,0.5);
    margin: 0;
    padding: 0 1em;
    letter-spacing: 0.02em;
}
</style>
