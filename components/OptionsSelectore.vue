
<style scoped>
    .difficulty-scale{
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align:center;
    background: radial-gradient(var(--black) 8%,transparent 8%);
    background-position: 0% 0%;
    background-size: 2.5vmin 2.5vmin;
    background-repeat: repeat;
    border:2px dashed black;
    border-radius: 20px;
    padding:5px;
    color: white;
    min-width:50%;
    max-width: 100%;
    align-self: center;
    justify-self: center;
    font-size:3vmin;

  }

  @media screen and (max-width:900px){
    .difficulty-scale{
      width:98%;
    }
  }

  .difficulty-scale > *{
    color:black;
    border-radius:inherit;
    box-shadow: 0px 0px 7px rgba(0,0,0.7);
    background-color: white;
    padding:5px;
    transition: ease 0.5s;
  
  }
  .difficulty-indicator:hover{
   
    transform: translateX(20px) scale(1.25);
  }
  
  .dropdown-text{
    color:black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:2px;
    font-size: 3vmin;
  } 
  .drop-men-item:hover{
    color:black;
    transform: scale(0.25);
    
  }
</style>

<template>
    <div class="difficulty-scale"  :style="{backgroundColor:computedColors[difficulty]}">

    <span class="difficulty-indicator" >
      {{ categories }}: <span >{{ difficulty }}</span>
    </span>

    <span>

      <el-dropdown   @command="handleCommand" placement="bottom">
      <span class="dropdown-text">Choose {{props.categories}}<el-icon><ArrowDown/></el-icon></span>
      <template #dropdown>
        <el-dropdown-menu>
        <el-dropdown-item v-for="op in props.options" divided :command="op" :style="{backgroundColor:`${computedColors[op]}`}">
            {{ op }}
        </el-dropdown-item>
        
        </el-dropdown-menu>
      </template>

    </el-dropdown>
    </span>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    options:string[],
    categories:string,
    initialValue:string,
}>()
const emits = defineEmits(['return-value'])

const difficulty = ref<string>(props.initialValue)

const colors = ['#28afb0','#f4d35e','#EE964B']

const computedColors = computed(()=>{
    var myColors: Record<string, string> = {

    }
    var counter = 0
    props.options.forEach((op:string)=>{
    if(counter!=colors.length){
        myColors[op] = colors[counter]
        counter++
    }
    else{
        counter = 0
        myColors[op]=colors[counter]
        counter++
    }
       
    })
    return myColors
    
})
function setDifficulty(value: string): void {
    difficulty.value = value
    emits('return-value', value,computedColors.value[value])
}

defineExpose({ setDifficulty })

function handleCommand(command:string){
    props.options.forEach((op)=>{
        if(op==command){
            difficulty.value = command
            emits('return-value',op,computedColors.value[op])
        }
        else{
            return
        }
        
    })

}
</script>
