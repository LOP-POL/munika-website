<style>
    .comm-card-container{
        display: flex;
        flex-direction: column;
        min-width:50vw;
        max-width:100vw;
        max-height:80%;
        min-height:40vh;
        border:2px dashed black;
        border-radius: 20px;
        padding:10px;
        margin:5px;
        box-shadow:-10px -10px  pink,
                    -20px -20px yellow;
       
        background-color: lightgreen;
        font-size:2.5vmin;
    }
    .meta{
        width:100%;
        height:100%;
        display: grid;
        grid-template-columns: 0.5fr 1fr;
        grid-template-rows:1fr;
       
       
    }
    .meta-image{
        width:100px;
        height:100px;
        border-radius:50%; 
         box-shadow:inset -10px -10px  pink,
                    inset -20px -20px yellow;
        border:2px solid black;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .meta-image img{
        width:60%;
        height:60%;
        object-fit:cover;
        border-radius: 50%;
        background-color: transparent;
         box-shadow:-5px -5px  pink,
                    -10px -10px yellow;
       
         transform: rotateX(2deg) rotateY(-30deg);
        
       
    }
    .meta-image img :hover{
        transform: scale(1.25);
        width:80%;
        height:80%
    }
    .full-name{
        color:var(--seasalt)
    }
    .more{
        display: flex;
        justify-content: space-around;
    }
</style>
<template>
    <div class="comm-card-container" :style="{...specialBoxShadow,backgroundColor:`${primaryColor}`}" >
        <div class="meta">
            <div class="meta-image" :style="specialBoxShadowInset" >
                <img :src="metaImage" alt="committee" >
            </div>
            <div class="meta-name">
                <h2 class="main-name">
                    {{ mainName }}
                </h2>
                <h4 class="full-name" :style="props.type=='Intermediate'?{color:'black'}:{color:'white'}">
                    {{ fullName }}
                </h4>
            </div>
          
        </div>
          <el-divider></el-divider>
        <div class="topic">
            <p>
                {{ topic }}
            </p>
        </div>
         <el-divider></el-divider>
        <div class="more">
            <el-button type="warning"  class="btn-signup" v-on:click="">Sign Up</el-button>
            <el-button type="info" plain class="btn-more-info" v-on:click="setCommittee">More Info</el-button>
           
        </div>
    </div>

</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue'

const props = defineProps<{
    mainName: string
    fullName: string
    topic: string
    SignUpLink: string
    metaImage: string
    type:string
}>()

const emit = defineEmits<{
    (e: 'set-committee', mainName: string): void
}>()


const primaryColor = ref('lightgreen')
const secondaryColor = ref('pink')
const tertiaryColor = ref('yellow')

const specialBoxShadow = ref(
    {
        boxShadow: `-10px -10px  ${secondaryColor.value},-20px -20px ${tertiaryColor.value}`,
    }
)
const specialBoxShadowInset = ref(
    {
        boxShadow: `inset -10px -10px  ${secondaryColor.value},inset -20px -20px ${tertiaryColor.value}`,
    }
)


function setCommittee(e: Event) {
    // Programmatically navigate to the element with id "content"
    
    const el = document.getElementById('content')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
    emit('set-committee', props.mainName)
}

function specialColors():void{
    console.log(props.type)
    if (props.type === 'Beginner') {
        primaryColor.value = 'lightgreen'
        secondaryColor.value = 'yellow'
        tertiaryColor.value = 'pink'
    } else if (props.type === 'Intermediate') {
        primaryColor.value = 'yellow'
        secondaryColor.value = 'lightgreen'
        tertiaryColor.value = 'pink'
    } else if (props.type === 'Expert') {
        primaryColor.value = 'pink'
        secondaryColor.value = 'yellow'
        tertiaryColor.value = 'lightgreen'
    } else {
        primaryColor.value = 'lightgreen'
        secondaryColor.value = 'yellow'
        tertiaryColor.value = 'pink'
    }

    specialBoxShadow.value = {
        boxShadow: `-10px -10px  ${secondaryColor.value},-20px -20px ${tertiaryColor.value}`,
    }

    specialBoxShadowInset.value =  {
        boxShadow: `inset -10px -10px  ${secondaryColor.value},inset -20px -20px ${tertiaryColor.value}`,
    }
   
}

onMounted(()=>{
    specialColors()
})
import { watch } from 'vue'

watch(() => props.type, () => {
    specialColors()
})

</script>