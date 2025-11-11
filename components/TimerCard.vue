<style>
* {
    transition: 0.5s ease;
}

.time-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 5px 5px;
    grid-auto-flow:column;
    grid-template-areas:
        "timeline countdown"
    ;

    padding: 5px;
    width: 80%;
    border-radius: 20px;
    border: dashed 2px var(--french-grey);
    transition: 0.5s ease-in-out;
    
    padding: 10px;
    margin: 20px;
     

}

@media screen and (max-width: 768px) {
    .time-card-container {
        /* grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
            "countdown"
            "timeline"; */
        width: 80%;
        height: 50%;
        max-height: 200px;
        justify-self: center;
    }

}

.time-card-container :hover {
    transform: translateY(5px);

}

.countdown {
    grid-area: countdown;
    background-image: url("/styleImgs/landscape-autum.jpg"), radial-gradient(var(--school-bus-yellow) 8%, transparent 8%);
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    transition: 0.5s ease;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 100%;
}

.countdown p {
    font-size:2rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #fff;
    background-color:rgba(33, 33, 33, .7);
    border-radius: inherit;
    padding:5%;
}

.timeline-container {
    grid-area: timeline;
    background: radial-gradient(var(--school-bus-yellow) 8%, transparent 8%);
    background-position: 0% 0%;
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
}

.start {
    background-color: #ffc;
    width:80%;
    height: 50%;
    font-size: 50%;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    ;
    transform: rotate(-5deg);
    transition: transform .15s linear;
}

 .end {
    background-color: pink;
   width:80%;
    height: 50%;
    font-size: 50%;
    transform: rotate(3deg);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    ;

}
.timeline{
    max-width: 200px;
     height:50%;
     border-radius:1.2rem;
     backdrop-filter: blur(2px);
     background-color: hsla(0, 100%, 1%, 0.457);
}

.timeline-container .start.animate,
.timeline-container .end.animate {
    animation: gradient-rotate 1.5s ease-in-out reverse;
}

@keyframes gradient-rotate {
    0% {
        transform: scale(1.05);
        position: relative;
        z-index: 2;
    }

    50% {
        transform: scale(1.25);
        box-shadow: 10px 10px 7px rgba(0, 0, 0, .7);
        transform: rotate(-5deg);
        z-index: 5;
    }

    100% {
        transform: scale(1);
        box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
        transform: scale(1.25);
        z-index: 1;
    }
}

.timeline-container .end:hover,
.timeline-container .start:hover {
    box-shadow: 10px 10px 7px rgba(0, 0, 0, .7);
    transform: scale(1.25);
    position: relative;
    z-index: 5;
}
</style>
<template>
    <div class="time-card-container">

        <div class="countdown">
            <p>Days</p>

            <p>{{ daysRemaining }}</p>

             
        </div>

        <div class="timeline-container">
           <el-card class="start" ref="start">
                <span style="float:right">
                    📍
                </span>
                <h2 style="color:black">5th December 2025 </h2>
            </el-card>
            <br>
            <el-card class="end" ref="end">
                <span style="float:left">
                    📍
                </span>
                <h2 style="color:black">7th December 2025 </h2>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const targetDate = new Date('2025-12-05')

const start = ref<HTMLElement | null | Element>(null)
const end = ref<HTMLElement | null | Element>(null)

const timelineStyles = ref({
    maxWidth: '100px',
    height: '50%',
    borderRadius: '1.2rem',
    backdropFilter: 'blur(2px)',
    backgroundColor: 'white',
    width:'80%',
    padding:'10px'
})
function getDaysRemaining(date: Date) {
    const now = new Date()
   
    const diff = date.getTime() - now.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const daysRemaining = computed(() => getDaysRemaining(targetDate))

onMounted(() => {
    const startObserve = document.querySelector('.start')
    const endObserve = document.querySelector('.end')

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).classList.add('animate');
            }
        })
    }, { threshold: 0.5 })

    setTimeout(() => {
        observer.disconnect();
    }, 5000);

    if (startObserve && endObserve) {
        observer.observe(startObserve)
        observer.observe(endObserve)
    }
})

</script>