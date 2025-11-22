<template>
    <section class="container-home container-home-main" ref="headerRef">
        <!-- <el-button class="kamun-fab" circle @click.stop="openPicture">
            <el-icon>
                <ArrowLeftBold />
            </el-icon>
        </el-button> -->
        <div class="left-side layered-content" ref="leftRef">
            <!-- Hero Section -->
            <section class="hero-gradient min-h-screen center-flex" ref="leftRef">

                <div class="max-w-4xl" data-aos="fade-up" data-aos-duration="800">
                        <div  class="mb-8">
              <img src="/img-logos/Kamun2025Logo.png" height="50px" width="50px" style="border-radius: 50%;"/>
            </div>
                    <h1>Karlsruhe Model United Nations</h1>
                    <p>Shaping future diplomats through debate, diplomacy, and global awareness.</p>
                    <div class="flex">
                        <NuxtLink to="/" class="btn-kamun" style="background-color: black; border: solid 1px black;">Come to MUNIKA</NuxtLink>
                        <NuxtLink to="/KAMUN/committees" class="btn-join">Sign Up</NuxtLink>
                        <NuxtLink to="/news" class="btn-news" style="background-color: var(--french-gray); color:white;">Latest News</NuxtLink>
                    </div>


                </div>

                <div
                    style="background-color: transparent; position: absolute; bottom:0; left: 0; right:0; z-index:2; transform:rotatex(180deg);">
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
        <div class="layered-content underlay-kamun" ref="underlayRef">

            <div class="overlay-content">
                <h2>The Black Forest Summit</h2>
            </div>
        </div>

        <div class="right-side layered-content" ref="rightSideRef">
            <!-- <div v-for="(quote, idx) in quotes" :key="idx" class="quote-text">
                <p>{{ quote }}</p>
            </div> -->
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'

// Define refs for DOM elements

// const quotes = ref([
//     "leon is aweseome",
//     "the north face",
//     "finshs him",
//     "but daddy I love him",
//     "on please it is not that serious",
//     "some more quotes"
// ])

// const { data } = useFetch(`/api/quotes/quotes`)

const leftRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const underlayRef = ref<HTMLElement | null>(null)
const rightSideRef = ref<HTMLElement | null>(null)

const handleMove = (e: MouseEvent | Touch) => {
    if (!leftRef.value || !underlayRef.value || !toggle) return

    const clientX = 'clientX' in e ? e.clientX : 0
    const p = clientX / window.innerWidth * 100

    // leftRef.value.style.width = `${p}%`
    underlayRef.value.style.width = `${p}%`
}

const onScroll = (e: Event) => {
    if (!leftRef.value || !underlayRef.value || !headerRef.value) return

    const headerWidth = headerRef.value?.offsetWidth || 0

    //const maxWidth = headerRef.value?.getBoundingClientRect().width

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
//             // showQuotes(false)
//         }, 4000)

//     }
// }
const onMouseMove = (e: MouseEvent) => handleMove(e)
const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0])
}

let toggle = true
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
    if (headerRef.value) {
        headerRef.value.addEventListener('mousemove', onMouseMove)
        headerRef.value.addEventListener('touchmove', onTouchMove)
        // window.addEventListener('scroll', onScroll, { passive: false })
        // showQuotes(false)

    }
})

onUnmounted(() => {
    if (headerRef.value) {
        headerRef.value.removeEventListener('mousemove', onMouseMove)
        headerRef.value.removeEventListener('touchmove', onTouchMove)
        // window.removeEventListener('scroll', onScroll)

    }

})
</script>



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
    color: white;
}



.right-side>* {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.00) 100%);
    backdrop-filter: blur(2px);

}

.btn-kamun {
    background-color:black;
    color: white;
    border: 1px solid black;
    text-decoration: none;
    padding: 5px 15px;
    border-radius: 20px;
     margin: 20px;
}

.btn-join {
    background-color: white;
    color: #2d3748;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    padding: 5px 15px;
    border-radius: 20px;
     margin: 20px;
}

.btn-news {
    background-color: transparent;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    text-decoration: none;
    padding: 5px 15px;
    border-radius: 20px;
    margin: 20px;
}

.scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
}

.bounce {
    display: inline-block;
    animation: bounce 2s infinite;
}


.btn-primary {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease;
    font-size: 3vmin;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
}

hero-gradient p {
    max-width: 42rem;
    margin: 0 auto 2.5rem;
}



.underlay-kamun {
    z-index: 2;
    /* background-color: var(--theme-color); */

    background-image: url("/styleImgs/forest-silouette-yellow.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: linear-gradient(120deg, rgba(255, 255, 255) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.00) 100%);
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
    font-size: 20px;
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
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0 1em;
    letter-spacing: 0.02em;
}
</style>
