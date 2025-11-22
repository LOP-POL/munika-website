<template>
  <section class="head-and-c-section"  :class="{ inner: inner }">
    <div ref="hNCWrapper">
    <h2 :class="['head-and-c-title',{'picture':picture}]" :style="{backgroundImage:`url(${pictureUrl})`}">
        <slot name="title"></slot>
    </h2>
    <img v-if="picture" :src="pictureUrl" alt="team picture" class="paraPic"></img>
    </div> 
    <el-divider v-if="divider"></el-divider>
    <div :class="['head-and-c-content', { 'row-form': rowForm, 'col-form': colForm }]">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  divider?: boolean,
  rowForm?: boolean,
  colForm?: boolean,
  inner?: boolean,
  picture?:boolean,
  pictureUrl?:string,
}>()

const hNCWrapper = ref()

onMounted(()=>{
  if(props.picture){
     hNCWrapper.value.classList.add('parallaxWrapper')
  }
 
})

</script>

<style scoped>
.head-and-c-section {
  background-color: var(--seasalt);
  padding: 10px;
  border-radius: 5px;
  max-width: 100vw;
  min-width:50vw;
  width:100%;
  margin: 0 auto;
  box-sizing: border-box;
  
  
}
.parallaxWrapper{
   overflow-y:hidden;
    overflow-x: hidden;
    perspective:10px;
    height: 60vh;
    width: 100%;
    transform-style: preserve-3d;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:1;
    border-radius:10px;
   
}
.paraPic{
  position: absolute;
     height: 110%;
     width: 110%;
     transform: translateZ(-10px) scale(2);
     transform-style: preserve-3d;
     z-index:-1;
     object-fit: cover;
     transform: translateZ(-10px) scale(2);
     border-radius:10px;
    
}
.inner {
  min-width: 50%;
}
.head-and-c-title {
  color: var(--french-gray);
  margin-bottom: 0.5em;
  text-align:left;
}
.head-and-c-content {
  width: 100%;
  text-align:left;
}
.row-form {
  display: flex;
  justify-content: space-evenly;
  align-items: space-between;
}
.col-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
 
}
.picture{
  background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    max-height:100%;
    color:var(--theme-color);
    border-radius:20px;
    text-align: center;
    
     font-family: 'Georgia', 'Times New Roman', Times, serif;
    font-style: italic;
    font-size: 2.0vmax;
     box-shadow: 0px 0px 10px black;
}

@media (max-width: 900px) {
    .head-and-c-section{
        display: block;
    }
    .row-form{
        display: block;
    }
    .col-form{
        display: block;
        
    }
}
</style>
