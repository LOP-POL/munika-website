<style>
* {
    transition: 0.5s ease;
}

.time-card-container {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-rows: 1fr;
    gap: 10px 10px;
    grid-auto-flow: row;
    grid-template-areas:
        "countdown timeline"
    ;
    box-shadow: 0px 0px 10px black;
    padding: 5px;
    width:60%;
    border-radius: 20px;
    border: dashed 2px var(--french-grey);
    transition: 0.5s ease-in-out;
    height: 20%;
    padding: 10px;
    margin:20px;

}

@media screen and (max-width: 768px) {
    .time-card-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
            "countdown"
            "timeline";
        width: 80%;
        height:50%;
        justify-self:center;
    }
  
}

.time-card-container :hover {
    transform: translateY(5px);

}

.countdown {
    grid-area: countdown;
    background-image: url("/img/United_Nations_General_Assembly_Hall_(3).webp");
    background-position: center;
    border-radius: 10px;
    transition: 0.5s ease;

}

.timeline-container {
    grid-area: timeline;
    background: radial-gradient(var(--seasalt) 8%, transparent 8%);
    background-position: 0% 0%;
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
}

.timeline-container .start {
    background-color: #ffc;

    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    ;
    transform: rotate(-5deg);
    transition: transform .15s linear;
}

.timeline-container .end {
    background-color: pink;

    transform: rotate(3deg);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, .7);
    ;

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
    box-shadow: 10px 10px 7px rgba(0,0,0,.7);
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

.days,
.time {
    font-size: 3vmax;
    /* increased size */
    font-weight: 700;
    box-shadow: 0px 2px 10px black;
    text-align: center;
    border-radius: 10px;

    background-color: var(--seasalt);
    background: radial-gradient(var(--school-bus-yellow) 8%, transparent 8%);
    background-position: 0% 0%;
    background-size: 8vmin 8vmin;
    background-repeat: repeat;
    color: white;
    margin: none;
    padding: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    /* ensures vertical centering */
}

.days-text,
.time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.days-remaining {
    font-size: 4vmax;
    /* even bigger for the number */
    font-weight: 900;
    margin: 0;
    padding: 0;
}

.start span,
.end span {
    text-align: right;
}
</style>
<template>
    <el-container class="time-card-container">
        <div class="countdown">
            <el-row>
                <el-col :span="24">
                    <div class="time">
                        <p class="days-remaining">Days</p>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row class="days">
                <el-col :span="24">
                    <div class="days-text">
                        <p class="days-remaining">{{ daysRemaining }}</p>

                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="timeline-container">
            <el-timeline style="max-width: 600px">
                <el-timeline-item timestamp="Start" placement="top" color="lightgreen">

                    <el-card class="start" ref="start">
                        <span style="float:right">
                            📍
                        </span>
                        <h2 style="color:black">5th December 2025 </h2>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="End" placement="top" color="pink">

                    <el-card class="end" ref="end">
                        <span style="float:left">
                            📍
                        </span>
                        <h2 style="color:black">7th December 2025 </h2>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </el-container>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const targetDate = new Date('2025-12-05')

const start = ref<HTMLElement | null | Element>(null)
const end = ref<HTMLElement | null | Element>(null)

function getDaysRemaining(date: Date) {
    const now = new Date()
    console.log(now.getTime())
    console.log(date.getTime())
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