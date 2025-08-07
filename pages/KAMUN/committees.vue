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
  .card-holder{
    display:flex;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap:10px 50px;
    /* flex-direction: row;
    justify-content: space-around; */
    max-width:90vw;
    overflow-y: auto;
    min-height:50vh;
    max-height:500px;
    margin:20px;
    background-image:radial-gradient(var(--french-gray) 8%,transparent 8%);
    background-size: 5vmin 5vmin;
    background-repeat: repeat;
    background-position: center;
    border-radius: 20px;  
    padding:20px;
  
  }

  /* Hide the scrollbar track/guide but show the scrollbar thumb/bar for .card-holder */
  .card-holder {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
  }

  /* For Chrome, Edge, Safari */
  .card-holder::-webkit-scrollbar {
    height: 8px;
    background: transparent;
  }
  .card-holder::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  .card-holder::-webkit-scrollbar-track {
    background: transparent;
  }
 
</style>
<template>
  <div class="difficulty-scale"  :style="{backgroundColor:colors[`${difficulty}`]}">

    <span class="difficulty-indicator" >
      Difficulty: <span >{{ difficulty }}</span>
    </span>

    <span>

      <el-dropdown   @command="handleCommand" placement="bottom">
      <span class="dropdown-text">Change Difficulty <el-icon><ArrowDown/></el-icon></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="drop-men-item"style="background-color:#28afb0;" divided command="Beginner" >Beginner</el-dropdown-item>
          <el-dropdown-item class="drop-men-item" style="background-color:#f4d35e;" divided command="Intermediate" >Intermediate</el-dropdown-item>
          <el-dropdown-item class="drop-men-item" style="background-color:#EE964B;" divided command="Expert" >Expert</el-dropdown-item>
        </el-dropdown-menu>
      </template>

    </el-dropdown>
    </span>
  </div>
  <el-scrollbar>
    <div class="card-holder">
    
      <CommitteeCard
      v-for="(committee, idx) in committeeLevelToList"
      :key="committee.mainName + idx"
      :mainName="committee.mainName"
      :fullName="committee.fullName"
      :topic="committee.topic"
      :logo="committee.logo"
      :SignUpLink="committee.SignUpLink"
      :metaImage="committee.metaImage"
      :type="committee.type"
      @set-committee="setCommittee"
    />
   
    
  </div>
  </el-scrollbar>
  
    <el-divider></el-divider> 

  <div class="card-content" id="content">
    <headAndC v-if="currentCommittee" :divider="true">
      <template #title>
        {{ currentCommittee.mainName }}
      </template>
      <div>
        <strong>{{ currentCommittee.fullName }}</strong><br>
        <p>{{ currentCommittee.topic }}</p>
        <p>{{ currentCommittee.description }}</p>
      </div>
    </headAndC>
  </div>

 
</template>
<script setup lang="ts">

import CommitteeCard from '~/components/CommitteeCard.vue'
import headAndC from '~/components/headAndC.vue'

import {
  ArrowDown,
} from '@element-plus/icons-vue'
definePageMeta({
  layout: 'kamun-bar'
});

enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT =  'Expert'
}
interface Committee {
  mainName: string
  fullName: string
  logo:string
  topic: string
  description?: string
  SignUpLink: string
  metaImage: string
  type: string
}
const difficulty = ref<string | Difficulty>(Difficulty.BEGINNER)

const colors: Record<string,string> = {
  Beginner:'#28afb0',
  Intermediate:'#f4d35e',
  Expert:'#EE964B'
}
const committees = ref<Committee[]>( [
  {
    mainName: "UNESCO",
    fullName: "United Nations Educational, Scientific and Cultural Organization",
    logo:"/img-logos/UNESCO_logo.webp",
    topic: "Preserving World Heritage in Conflict Zones",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value
  },
  {
    mainName: "WHO",
    fullName: "World Health Organization",
     logo:"/img-logos/UNESCO_logo.webp",
    topic: "Global Response to Future Pandemics",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value
  },
  {
    mainName: "COPOUS",
    fullName: "Committee on the Peaceful Uses of Outer Space",
     logo:"/img-logos/UNESCO_logo.webp",
    topic: "International Cooperation in Space Exploration",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value
  }
])

const { data } = useFetch(`/api/committees/committees`)

const currentCommittee = ref(committees.value[0])


const committeeLevelToList = computed(() => {
  if (difficulty.value) {
    return committees.value.filter((committee) => committee.type === difficulty.value);
  }
  return [];
});

function setCommittee(committeeMainName:string = committees.value[0].mainName){
  const foundCommittee = committees.value.find(c => c.mainName === committeeMainName)
  currentCommittee.value = foundCommittee ? foundCommittee : committees.value[0]
}

function handleCommand(command:string){
  switch (command) {
    case Difficulty.BEGINNER:
      difficulty.value = Difficulty.BEGINNER;
      break;
    case Difficulty.INTERMEDIATE:
      difficulty.value = Difficulty.INTERMEDIATE;
      break;
    case Difficulty.EXPERT:
      difficulty.value = Difficulty.EXPERT;
      break;
  }

}
watchEffect(() => {
  if (data.value?.fromQuery?.results) {
    // if (process.client) {
    //   const jsonData = JSON.stringify(data.value?data.value:"", null, 2);
    //   const blob = new Blob([jsonData], { type: 'application/json' });
    //   const fileUrl = URL.createObjectURL(blob);

    //   // Create a temporary link to trigger download
    //   const link = document.createElement('a');
    //   link.href = fileUrl;
    //   link.download = 'committees.json';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(fileUrl);
    // }

    
    committees.value = data.value?.fromQuery.results.map((result: any) => ({
      mainName: result.properties["main-name"]?.rich_text?.[0]?.plain_text || '',
      fullName: result.properties["full-name"]?.rich_text?.[0]?.plain_text || '',
      logo: result.properties["logo"]?.files?.[0]?.file.url|| '/img-logos/chairs_choice.webp',
      topic: result.properties["topic"]?.rich_text?.[0]?.plain_text || '',
      description: result.properties["description"]?.rich_text?.[0]?.plain_text || '',
      SignUpLink: "https://mymun.com/conferences/kamun-2025",
      metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
      type:result.properties["committee-type"]?.multi_select?.[0]?.name || difficulty.value
    }));

  }
});

</script>