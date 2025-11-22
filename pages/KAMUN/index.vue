<script setup lang="ts">
import { constrainPoint } from '@fullcalendar/core/internal'
import { ref, onMounted } from 'vue'
import { useMetaStore } from '~/piniaStores/metaStore'

const tooltipVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)


const originalThemeText = 'Visions Across Frontiers: Rethinking Sovereignty, Innovation, and Inclusion'

const kamunThemeTextRef = ref<HTMLElement | null>(null)


const metaStore = useMetaStore()
const themeText =computed(()=> metaStore.getConferenceMeta.theme??metaStore.getConferenceMeta[0].theme??'Visions Across Frontiers: Rethinking Sovereignty, Innovation, and Inclusion')
const themeSegments = computed(() => {
    if (metaStore.getConferenceMeta) {
        return (metaStore.getConferenceMeta.theme??metaStore.getConferenceMeta[0].theme).split(" ")
    }
})

useHead({
    title: "KAMUN",
    meta: [{
        name: 'description', content: 'Karlsruhe Model United Nations , MUN COnference , Black forest Summit'
    }]

})

definePageMeta({
    layout: 'kamun-bar'
})



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

    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let iterations = 0
                const target = kamunThemeTextRef.value

                if (!target) return
                let interval: number | undefined
                interval = window.setInterval(() => {
                    target.innerText = target.innerText.split("")
                        .map((letter, index) => {
                            if (index < iterations) {
                                return originalThemeText[index]
                            }
                            return letters[Math.floor(Math.random() * 26)]
                        })
                        .join("")
                    if (iterations >= originalThemeText.length) {
                        clearInterval(interval)
                        target.innerText = originalThemeText
                    }
                    iterations += 1 / 1.2
                }, 40)
            }
        })
    }, { threshold: 0.2 })


    // if(kamunThemeTextRef.value){
    //      themeObserver.observe(kamunThemeTextRef.value)
    // }   

    if (themeSegments.value) {
        themeSegments.value.forEach((segment) => {
            var mySpan: HTMLElement = document.createElement("span")
            mySpan.textContent = segment + " "
            mySpan.classList.add("animated-segment")
            kamunThemeTextRef.value?.appendChild(mySpan)
        })

        // Add hover listener to the container
        kamunThemeTextRef.value?.addEventListener("mouseenter", (e) => {
            if (kamunThemeTextRef.value?.children.length) {
                for (var i = 0; i < kamunThemeTextRef.value?.children.length; i++) {
                    const child = kamunThemeTextRef.value?.children.item(i)
                    if(child != null) {
                        // (child as HTMLElement).style.animation = 'up 1s forwards'
                        const el = child as HTMLElement
                        el.animate(
                            [

                                { color:'yellow',transform:'translateY(100px)'},
                                {transform:'translateY(-100px)',color:'grey'},
                                {color:'white'},
                                {color:'black'}
                            ],
                            {
                                duration:2000,
                                easing: 'cubic-bezier(.2,.8,.2,1)',
                                delay: i * 100,
                                fill: 'forwards',
                            }
                        )
                       
                    }
                }
            }
        })
        // observe the theme container and play the segment animations when it enters view
        if (kamunThemeTextRef.value) {
            const segmentObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return
                    const container = entry.target as HTMLElement
                    if (!container) return

                    for (let i = 0; i < container.children.length; i++) {
                        const child = container.children.item(i) as HTMLElement | null
                        if (!child) continue

                        child.animate(
                            [
                                { color: 'yellow', transform: 'translateY(100px)' },
                                { transform: 'translateY(-100px)', color: 'grey' },
                                { color: 'white' },
                                { color: 'black' }
                            ],
                            {
                                duration: 2000,
                                easing: 'cubic-bezier(.2,.8,.2,1)',
                                delay: i * 100,
                                fill: 'forwards'
                            }
                        )
                    }

                    // only play once; remove observer for this element
                    // obs.unobserve(container)
                })
            }, { threshold: 0.2 })

            segmentObserver.observe(kamunThemeTextRef.value)
        }

        // Reset animation on mouse leave
        // kamunThemeTextRef.value?.addEventListener("mouseleave", (e) => {
        //     if (kamunThemeTextRef.value?.children.length) {
        //         for (var i = 0; i < kamunThemeTextRef.value?.children.length; i++) {
        //             const child = kamunThemeTextRef.value?.children.item(i)
        //             if(child != null) {
        //                 (child as HTMLElement).style.animation = ''
        //             }
        //         }
        //     }
        // })
    }



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
    <br></br>
    <section class="main-section">
        <head-and-c class="kamun-theme">
            <template #title>
                This Years Theme
            </template>
            <h1 class="kamun-theme-text" ref="kamunThemeTextRef">
               
            </h1>
        </head-and-c>
    </section>

    <br></br>

    <section class="main-section">
        <head-and-c :row-form="true">
            <head-and-c :inner="true" :col-form="true">
                <template #title>
                    When
                </template>

                <p>
                    KAMUN is a winter conference
                    and this year it is no different,
                    it takes place from <em style="font-size: larger; font-weight: 600;">5th December to the 7th
                        December
                        2025</em>
                </p>
                <TimerCard />

            </head-and-c>

            <head-and-c :col-form="true" :inner="true">
                <template #title>Where</template>
                <p>As per usual KAMUN will be held at the <a href="https://www.kit.edu/" color="turquoise">Karlsruhe
                        Institute of Technology</a>. In the beautiful city of
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

    <section class="main-section">
        <!-- Replace the entire What to expect head-and-c section with the ExpectSection component -->
        <ExpectSection />
    </section>
</template>
<style>

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

.kamun-theme-text {
    font-family: 'Georgia', 'Times New Roman', Times, serif;
    font-style: italic;
    font-size: 2.2em;
    /* text-shadow: 0 50px; */
    
    cursor: pointer;
}

/* .kamun-theme:hover {
         animation:up 1s forwards;
    } */
@keyframes up{
   
    100%{
        transform: translateY(-100px);
    }
}
</style>