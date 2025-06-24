<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tooltipVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)



definePageMeta({
    layout: 'kamun-bar'
})
/**
 * Highlights vidSummary1 at 0:29 (food) and vidSummary3 at 0:34 (socials)
 */
const videoRef = ref<HTMLVideoElement | null>(null)
const vidSummary1 = ref<HTMLElement | null>(null) // food
const vidSummary2 = ref<HTMLElement | null>(null)
const vidSummary3 = ref<HTMLElement | null>(null) // socials
const vidCont = ref<HTMLElement | null>(null)
const videoPart = ref<HTMLElement | null>(null)

const backGroundImages = ref<Record<string, string>>(
    {
        "food": "/img/pictureOfFood.JPG",
        "bau": "/img/pictureMatheBau.JPG",
        "schloss": "/img/pictureInSchloss.JPG"
    }
)
// 0.29 food
// 0.34 socials


function handleVideoClicks(img: string, time: number, e: Event) {

    if (vidCont.value) {
        vidCont.value.style.backgroundImage = `url(${img})`
    }
    if (videoRef.value) {
        videoRef.value.currentTime = time;
        videoRef.value.play();
    }
}


onMounted(() => {

   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1'
            }

        })
    }, { threshold: 0.2 })

    document.querySelectorAll('.main-section').forEach(node => {

        observer.observe(node)
    })

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
<template>
    <kamun-page-header></kamun-page-header>
    <section class="main-section">
       
        <head-and-c :divider="true" :row-form="true">
            <head-and-c :inner="true" :col-form="true" >
            <template #title>
                When
            </template>
          
                <p >
                KAMUN is a winter conference
                and this year it is no different,
                it takes place from <em style="font-size: larger; font-weight: 600;">5th December to the 7th December
                    2025</em>
            </p>
            <TimerCard />
           
        </head-and-c>

            <head-and-c :col-form="true" :inner="true">
                <template #title>Where</template>
                <p>As per usual KAMUN will be held at the Karlsruhe Institude of Technology. In the beautiful city of
                    Karlsruhe
                    located just north of the black forest </p>


                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167469.92781493798!2d8.24472262261273!3d49.01595693288093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47970648a2e07809%3A0xb6fc55734cb7ee7f!2sKarlsruhe!5e0!3m2!1sen!2sde!4v1750761014472!5m2!1sen!2sde"
                    width="100%" height="380px" style="border:0;" allowfullscreen="true" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>


            </head-and-c>
        </head-and-c>



    </section>


    <el-divider></el-divider>
    <section class="main-section">
        <head-and-c :divider="true" :col-form="true">
            <template #title>What to expect</template>

            <head-and-c :inner="true" :row-form="true">
                <template #title></template>
                <div class="videoPart" ref="videoPart">
                    
                    <video controls :width="vidCont?.offsetWidth" autoplay muted loading="lazy" ref="videoRef">
                        <source src="/videos/KAMUN_2022_Promotion_Video (1).mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <br />
                
                <div class="vidSumCont" ref="vidCont" :style="{ height: videoPart?.clientHeight }">
                    <p class="vidSummary" ref="vidSummary1"
                       @mouseover="handleVideoClicks(backGroundImages.food,29,$event)" @click="handleVideoClicks(backGroundImages.food, 29, $event)">
                        Enjoy delicious food served throughout the conference, with a variety of options to suit every
                        taste
                        and dietary need.
                    </p>
                    <p class="vidSummary" ref="vidSummary2"@mouseover="handleVideoClicks(backGroundImages.bau,24,$event)" @click="handleVideoClicks(backGroundImages.bau, 24, $event)">
                        Experience our sessions in beautiful venues at the Karlsruhe Institute of Technology, offering a
                        unique and inspiring atmosphere.
                    </p>
                    <p class="vidSummary" ref="vidSummary3"
                       @mouseover="handleVideoClicks(backGroundImages.schloss,34,$event)" @click="handleVideoClicks(backGroundImages.schloss, 34, $event)">
                        Take part in unforgettable socials, where you can connect, network, and have fun with fellow
                        delegates from around the world.
                    </p>
                </div>
                <el-tooltip v-if="tooltipVisible" content="Click or hover" placement="bottom" effect="dark">
                  <div ref="tooltipRef" style="width:fit-content; margin:0 auto; font-size:1.2em; color:var(--theme-color); font-weight:bold;">
                    Click or hover
                  </div>
                </el-tooltip>
            </head-and-c>

            <head-and-c :inner="true">
                <template #title>
                    Want to contact or sponsor us ?
                </template>
                <p>Follow us on <a
                        href="https://www.instagram.com/munika_ev?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">instagram</a>
                    for all the newest updates regarding the conference.<br /></p>
                <el-divider></el-divider>


                <Calendar />
            </head-and-c>

        </head-and-c>
    </section>

</template>
<style>
.videoPart,
.vidSumCont {
    border-radius: 20px;
    margin: 20px;
    padding: 0;
    width: 40vw;

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
    width: 40vw;
}

.vidSumCont {
    background-image: url("/img/pictureInSchloss.jpg");
    
    background-position: center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    width: 40vw;
}

@media screen and (max-width:900px) {

    .videoPart video,
    .vidSumCont {
        width: 80vw;
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

#where-to {
    background-image: url("/styleImgs/forest-silouette-white.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.highlight-scale {
    transform: scale(1.25) !important;
    transition: transform 0.3s;
    z-index: 2;
}
</style>