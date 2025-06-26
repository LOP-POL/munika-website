<style>
    .comm-card-container{
        display: flex;
        flex-direction: column;
        min-width:50vw;
        max-width:100vw;
        max-height:80%;
        min-height:40vh;
        border:5px dashed #28afb0;
        border-radius: 20px;
        padding:10px;
        margin:5px;
        box-shadow:-10px -10px  #EE964B,
                    -20px -20px #f4d35e;
       
        background-color:whitesmoke;
        backdrop-filter: blur(5px);
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
         box-shadow:inset -10px -10px  #EE964B,
                    inset -20px -20px #f4d35e;
        border:2px solid black;
        background:none;
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
         box-shadow:-5px -5px  #EE964B,
                    -10px -10px #f4d35e;
       
         transform: rotateX(2deg) rotateY(-30deg);
         background-color:antiquewhite;
        
       
    }
    .meta-image img :hover{
        transform: scale(1.25);
        width:80%;
        height:80%;
        
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
    <div class="comm-card-container" :style="{...specialBoxShadow,borderColor:`${primaryColor}`}" >
        <div class="meta">
            <div class="meta-image" :style="specialBoxShadowInset" >
                <img :src="logo?logo:metaImage" alt="committee" >
            </div>
            <div class="meta-name">
                <h2 class="main-name">
                    {{ mainName }}
                </h2>
                <h4 class="full-name" :style="props.type=='Intermediate'?{color:'black'}:{color:'gray'}">
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
            <el-button type="warning"  class="btn-signup" @click="signUp" >Sign Up</el-button>
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
    logo:string
    SignUpLink: string
    metaImage: string
    type:string
}>()

const emit = defineEmits<{
    (e: 'set-committee', mainName: string): void
}>()


const primaryColor = ref('#28afb0')
const secondaryColor = ref('#EE964B')
const tertiaryColor = ref('#f4d35e')

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

function signUp(){
    if (props.SignUpLink) {
        window.open(props.SignUpLink, '_blank');
    }
}

function specialColors():void{
    console.log(props.type)
    if (props.type === 'Beginner') {
        primaryColor.value = '#28afb0'
        secondaryColor.value = '#f4d35e'
        tertiaryColor.value = '#EE964B'
    } else if (props.type === 'Intermediate') {
        primaryColor.value = '#f4d35e'
        secondaryColor.value = '#28afb0'
        tertiaryColor.value = '#EE964B'
    } else if (props.type === 'Expert') {
        primaryColor.value = '#EE964B'
        secondaryColor.value = '#f4d35e'
        tertiaryColor.value = '#28afb0'
    } else {
        primaryColor.value = '#28afb0'
        secondaryColor.value = '#f4d35e'
        tertiaryColor.value = '#EE964B'
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