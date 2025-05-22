<style>
*{
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
    padding:5px;
    width:90%;
    justify-self: center;
    border-radius: 20px;
    
    border: dashed 2px var(--french-grey);
    transition:0.5s ease-in-out;
    height:50%;
    padding:10px;
    margin: 10px;

}
@media (max-width: 768px) {
    .time-card-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
            "countdown"
            "timeline";
        width: 98%;
        height:50%
    }
}
.time-card-container :hover{
    transform: translateY(5px);
}
.countdown{
    grid-area: countdown;
    background-image: url("/img/United_Nations_General_Assembly_Hall_(3).webp");
    background-position: center;
    border-radius: 10px;
    transition: 0.5s ease;
     
}

.timeline-container{
    grid-area: timeline;
    background: radial-gradient(var(--seasalt) 8%,transparent 8%);
    background-position: 0% 0%;
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
}
.timeline-container .start :hover{
    background-color: lightgreen;
}
.timeline-container .end :hover{
    background-color: pink;
}
.days,.time{
    font-size: 4vmax; /* increased size */
    font-weight: 700;
    box-shadow: 0px 2px 10px black;
    text-align: center;
     border-radius: 10px;
    
     background-color: var(--seasalt);
    background: radial-gradient(var(--school-bus-yellow) 8%,transparent 8%);
    background-position: 0% 0%;
    background-size: 8vmin 8vmin;
    background-repeat: repeat;
    color:white;
    margin:none;
    padding: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 120px; /* ensures vertical centering */
}
.days-text, .time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.days-remaining {
    font-size: 5vmax; /* even bigger for the number */
    font-weight: 900;
    margin: 0;
    padding: 0;
}
</style>
<template>
    <el-container class="time-card-container">
        <div class="countdown">
            <el-row >
                <el-col :span="24">
                    <div class="time">
                         <p>Days</p>
                    </div>
                </el-col>
            </el-row>
            <el-divider ></el-divider>
            <el-row class="days">
                <el-col :span="24">
                    <div class="days-text">
                        <p class="days-remaining">{{ daysRemaining }}</p>
                       
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="timeline-container">
            <el-timeline style="max-width: 600px" >
                <el-timeline-item timestamp="Start" placement="top" color="lightgreen">
                    <el-card class="start" >
                        <h2 style="color:black">5th December 2025 </h2>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="End" placement="top" color="pink">
                    <el-card class="end" >
                        <h2 style="color:black">7th December 2025 </h2>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </el-container>
</template>
<script lang="ts" setup>
    import { ref, computed } from 'vue'

    const targetDate = new Date('2025-12-05')

    function getDaysRemaining(date: Date) {
        const now = new Date()
        console.log(now.getTime())
        console.log(date.getTime())
        const diff = date.getTime() - now.getTime()
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    const daysRemaining = computed(() => getDaysRemaining(targetDate))
    console.log(daysRemaining.value)
    
</script>