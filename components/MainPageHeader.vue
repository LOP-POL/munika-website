<style scoped>
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
    /* background-image: url("/styleImgs/schloss.jpg"); */
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
    color: white;


}

.lighten-back{
      background-color: rgba(251, 250, 250, 0.483);
    
     
      background-color: hsla(51, 100%, 50%, 0.1);
      background-color: rgba(0, 0, 0, 0.472);
      background-color: #2f4f3e88
}
.right-side {

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
    font-size: 20px;
    font-family: cursive;
    color: white;
}

.teamPictureBg {
    background-image: url('/styleImgs/teamPictureBW.jpg');
    background-image: cross-fade(url('/styleImgs/teamPictureBW.jpg') 0%,url('/styleImgs/schloss.jpg') 100%);
}

.schlossPictureBg {
    background-image: url('/styleImgs/schloss.jpg');
   
}

.color-white {
    color: white;
}

/* .right-side>* {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.00) 100%);
    backdrop-filter: blur(2px);
} */

.quote-text p {
    font-family: 'Georgia', 'Times New Roman', Times, serif;
    font-style: italic;
    font-size: 1.5em;
    color: #fff;
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0 1em;
    letter-spacing: 0.02em;
}


.underlay-munika {
    z-index: 2;

    /* opacity: 0.7; */
    background-image: linear-gradient(120deg, rgba(255, 255, 255) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.00) 100%);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    backdrop-filter: blur(20px);

}

.container-home {
    border-radius: 10px;
}

</style>
<template>
    <section class="container-home container-home-main" ref="headerRef" style="margin: 0; width:100%">
        <!-- <el-button class="kamun-fab" circle @click.stop="openPicture">
            <el-icon>
                <ArrowLeftBold />
            </el-icon>
        </el-button> -->
        <div class="left-side layered-content  " :class="teamPictureBg?'lighten-back':'darken-back'" ref="leftRef">

            <!-- Hero Section -->
            <section class=" min-h-screen center-flex" ref="leftRef">

                <div class="max-w-4xl" data-aos="fade-up" data-aos-duration="800">
                    <div class="mb-8">
                        <img src="/img-logos/MunikaLogo.jpg" height="100px" width="100px" style="border-radius: 50%;" @click="triggerGust"/>
                    </div>
                    <h1 :class="teamPictureBg ? 'color-white' : ''">Model United Nations Initiative Karlsruhe</h1>
                    <p :class="teamPictureBg ? 'color-white' : ''">Shaping future diplomats through debate, diplomacy, and global awareness.</p>
                    <div class="flex">
                        <NuxtLink to="/KAMUN" class="btn-kamun">Go to KAMUN</NuxtLink>
                        <NuxtLink to="/join" class="btn-join">Join Us</NuxtLink>
                        <NuxtLink to="/news" class="btn-news">Latest News</NuxtLink>

                    </div>


                </div>

                <!-- Scroll indicator -->
                <div class="scroll-indicator">
                    <a href="#content" class="bounce">
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </a>
                </div>

            </section>
        </div>
        <!-- <div class="layered-content underlay-munika" ref="underlayRef">
        </div> -->
          <div class="right-side layered-content " :class="teamPictureBg ? pictureToShow : ''" ref="rightSideRef">
            <!-- <div v-for="(quote, idx) in quotes" :key="idx" class="quote-text">
                <p>{{ quote }}</p>
            </div> -->
            <div v-if="isMobile || teamPictureBg" class="svg-container"  style="background-color: transparent; position: absolute; bottom:0; left: 0; height: unset; right:0; z-index:2; transform:rotatex(180deg);">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none"
                    style="width: 100%; height: 100%; fill:var(--theme-color);">
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z">
                    </path>
                </svg>
            </div>
            <div v-else class="svg-container">

                <svg id="svg-trees" viewBox="0 0 375 578" xmlns="http://www.w3.org/2000/svg"
                    :class="{ 'is-animated': animate, 'is-gusting': gusting }">

                    <g class="tree-svg" v-for="x in ['50vw', '35vw', '0', '20vw','-20vw', '-30vw','-40vw','-60vw','70vw','-70vw']" :key="x"
                        :style="{ transform: `translate(${x},0)` }">
                        <path id="Polygon 3" class="tree-part polygon3"
                            d="M180.165 150.513C183.517 145.354 191.069 145.354 194.421 150.513L372.699 424.991C376.372 430.646 372.314 438.121 365.571 438.121H9.01474C2.27189 438.121 -1.78607 430.646 1.88681 424.991L180.165 150.513Z"
                            />
                        <path id="Polygon 2" class="tree-part polygon2"
                            d="M180.243 83.9821C183.612 78.9803 190.974 78.9803 194.343 83.9821L328.983 283.872C332.786 289.518 328.741 297.121 321.934 297.121H52.6524C45.8452 297.121 41.7997 289.518 45.6026 283.872L180.243 83.9821Z"
                           />
                        <path id="Polygon 1" class="tree-part polygon1"
                            d="M180.4 4.02606C183.793 -0.674941 190.793 -0.674939 194.186 4.02606L284.845 129.646C288.902 135.268 284.885 143.121 277.952 143.121H96.6339C89.7013 143.121 85.6843 135.268 89.7413 129.646L180.4 4.02606Z"
                             />
                        <rect id="Rectangle 1" class="rectangle1" x="152.293" y="400.621" width="71" height="177" rx="9"
                           />
                    </g>



                </svg>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { useMediaQuery } from '@vueuse/core'

// const quotes = ref([
//     "Welcome to MUNIKA!",
//     "Debate. Diplomacy. Development.",
//     "Where leaders are made.",
//     "Inspiring the next generation.",
//     "Join us for a global experience.",
//     "Shape the world with your words."
// ])

// const { data } = useFetch(`/api/quotes/quotes`)


const leftRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const underlayRef = ref<HTMLElement | null>(null)
const rightSideRef = ref<HTMLElement | null>(null)


const animate = ref<boolean>(false)
const gusting = ref<boolean>(false)
const isMobile = useMediaQuery('(max-width: 1024px)')

const teamPictureBg = ref(false)
const turnBW = ref(false)


const pictureToShow = computed(() => {
    if (turnBW.value) {
        turnBW.value = !turnBW.value
        return 'teamPictureBg'
    }
    else {
        turnBW.value = !turnBW.value
        return 'schlossPictureBg'
    }
})


const triggerGust = () => {
    gusting.value = false
     teamPictureBg.value = !teamPictureBg.value
    requestAnimationFrame(() => {
        gusting.value = true
        setTimeout(() => {
            gusting.value = false
        }, 900)
    })
}



const handleMove = (e: MouseEvent | Touch) => {
    if (!leftRef.value || !underlayRef.value || !toggle) return
    const clientX = 'clientX' in e ? e.clientX : 0
    const p = clientX / window.innerWidth * 100
    leftRef.value.style.width = `${p}%`
    underlayRef.value.style.width = `${p}%`
}

const onScroll = (e: Event) => {
    if (!leftRef.value || !underlayRef.value || !headerRef.value) return
    const headerWidth = headerRef.value?.offsetWidth || 0
    const scrollPx = window.scrollY
    const size = headerWidth - scrollPx
    if (scrollPx != headerWidth) {
        // leftRef.value.style.width = `${(size) / headerWidth * 100}%`
        underlayRef.value.style.width = `${(size) / headerWidth * 100}%`
        underlayRef.value.style.opacity = `${(size) / headerWidth * 100}%`
    }
}

// function showQuotes(clear: boolean = true) {
//     if (!leftRef.value || !underlayRef.value || !headerRef.value) return
//     let index = 0;
//     const children = rightSideRef.value?.children;

//     if (children && children.length > 0) {
//         Array.from(children).forEach(child => (child as HTMLElement).style.opacity = "0");
//         index = Math.floor(Math.random() * children.length);
//         (children[index] as HTMLElement).style.opacity = "1";

//         setTimeout(() => {
//             (children[index] as HTMLElement).style.opacity = "0";
//             showQuotes(false)
//         }, 4000)

//     }
// }
const onMouseMove = (e: MouseEvent) => handleMove(e)
const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0])
}
let toggle = false
const openPicture = (e: Event) => {
    toggle = !toggle
    if (!headerRef.value || !leftRef.value || !underlayRef.value) return
    if (toggle) {
        headerRef.value.addEventListener('mousemove', onMouseMove)
        headerRef.value.addEventListener('touchmove', onTouchMove)
        window.removeEventListener('scroll', onScroll)
        leftRef.value.style.width = `50%`
        underlayRef.value.style.width = `50%`
        underlayRef.value.style.opacity = `50%`
        // showQuotes(false)
    }
    else {
        window.addEventListener('scroll', onScroll, { passive: false })
    }
}
// watchEffect(() => {

//     if (data.value?.response.results) {
//         // if (process.client) {
//         //   const jsonData = JSON.stringify(data.value?data.value:"", null, 2);
//         //   const blob = new Blob([jsonData], { type: 'application/json' });
//         //   const fileUrl = URL.createObjectURL(blob);

//         //   // Create a temporary link to trigger download
//         //   const link = document.createElement('a');
//         //   link.href = fileUrl;
//         //   link.download = 'quotes.json';
//         //   document.body.appendChild(link);
//         //   link.click();
//         //   document.body.removeChild(link);
//         //   URL.revokeObjectURL(fileUrl);
//         // }


//         quotes.value = data.value?.response.results.map((result: any) => (result.properties["quote_text"]?.rich_text?.[0]?.plain_text || ''
//         ));

//     }
// });
onMounted(() => {
    animate.value = true
    if (headerRef.value) {
        headerRef.value.addEventListener('mousemove', onMouseMove)
        headerRef.value.addEventListener('touchmove', onTouchMove)
        window.addEventListener('scroll', onScroll, { passive: false })
        // showQuotes(false)
    }
})
onUnmounted(() => {
    if (headerRef.value) {
        headerRef.value.removeEventListener('mousemove', onMouseMove)
        headerRef.value.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('scroll', onScroll)
    }
    // showQuotes(true)
})
</script>