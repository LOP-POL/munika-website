<style scoped>
.difficulty-scale {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 0.5rem 0.75rem;
  color: #172033;
  min-width: min(50%, 320px);
  max-width: 100%;
  align-self: center;
  justify-self: center;
  font-size: clamp(0.85rem, 2vw, 1rem);
}

@media screen and (max-width:900px) {
  .difficulty-scale {
    width: 100%;
    min-width: 0;
  }
}

.difficulty-scale>* {
  color: inherit;
  border-radius: 8px;
  padding: 0.35rem 0.5rem;

}

.difficulty-indicator::before {
  content: '';
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  margin-right: 0.45rem;
  border-radius: 50%;
  background: var(--difficulty-color);
  vertical-align: 0.02rem;
}

.difficulty-indicator:hover {
  transform: translateY(-1px);
}

.dropdown-text {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  font-size: clamp(0.85rem, 2vw, 1rem);
}

.drop-men-item:hover {
  color: black;
  transform: translateY(-1px);

}

.card-holder {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem);
    width: 100%;
    max-width: 1200px;
    margin: 1rem auto;
    padding: clamp(1rem, 3vw, 2rem);
    border-radius: 20px;
    background: radial-gradient(var(--french-gray) 8%, transparent 8%) center / 28px 28px repeat, var(--seasalt);
}

  .desc {
    overflow-wrap: anywhere;
  }

</style>
<template>
  <div class="pageTransitionWrapper">
    <div class="difficulty-scale" :style="{ '--difficulty-color': colors[difficulty] ?? colors.Beginner }">

      <span class="difficulty-indicator">
        Difficulty: <span>{{ difficulty }}</span>
      </span>

      <span>

        <el-dropdown @command="handleCommand" placement="bottom">
          <span class="dropdown-text">Change Difficulty <el-icon>
              <ArrowDown />
            </el-icon></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="drop-men-item" style="background-color:var(--blue-violet); color: white;" divided
                command="Highschooler">Highschooler</el-dropdown-item>
              <el-dropdown-item class="drop-men-item" style="background-color:var(--special-green);" divided
                command="Beginner">Beginner</el-dropdown-item>
              <el-dropdown-item class="drop-men-item" style="background-color:var(--special-yellow);" divided
                command="Intermediate">Intermediate</el-dropdown-item>
              <el-dropdown-item class="drop-men-item" style="background-color:var(--special-red);" divided
                command="Expert">Expert</el-dropdown-item>
              <el-dropdown-item class="drop-men-item" style="background-color:white" divided
                command="University">University</el-dropdown-item>

            </el-dropdown-menu>
          </template>

        </el-dropdown>
      </span>
    </div>
    <div class="card-holder">
      <CommitteeCard @click="handleClick" v-for="(committee, idx) in committeeLevelToList"
        :key="committee.mainName + idx" :mainName="committee.mainName" :fullName="committee.fullName"
        :spots="committee.spots"
        :topic="committee.topic" :logo="committee.logo" :SignUpLink="committee.SignUpLink"
        :metaImage="committee.metaImage" :type="committee.type" :types="committee.types" @set-committee="setCommittee" />
    </div>



    <div class="card-content" id="content">
      <headAndC v-if="currentCommittee" :divider="true">
        <template #title>
          {{ currentCommittee.mainName }}
        </template>
        <div>
          <strong>{{ currentCommittee.fullName }}</strong><br>
          <p> <b><em>Topic: </em></b> {{ currentCommittee.topic }}</p>
          <p>
              <b><em>size</em></b>: {{ currentCommittee.spots?currentCommittee.spots:0 }}
          </p>
          <p class="desc"><b><em>Description: </em></b>{{ currentCommittee.description }}</p>

        </div>
      </headAndC>
    </div>


  </div>

</template>
<script setup lang="ts">

import CommitteeCard from '~/components/CommitteeCard.vue'
import headAndC from '~/components/headAndC.vue'
import { ArrowDown } from '@element-plus/icons-vue'


enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
  UNI = 'University',
  HS = 'Highschooler'
}
interface Committee {
  mainName: string
  fullName: string
  logo: string
  topic: string
  description?: string
  SignUpLink: string
  metaImage: string
  type: string
  types: string[]
  spots?:number
}
const difficulty = ref<string | Difficulty>(Difficulty.BEGINNER)

const colors: Record<string, string> = {
  Beginner: '#2b9a91',
  Intermediate: '#c49a20',
  Expert: '#d77b35',
  Highschooler: '#7558bd',
  University: '#64748b'
}
const committeesState = useState<Committee[] | null>('committeesCache', () => null)
const committees = ref<Committee[]>([
  {
    mainName: "UNESCO",
    fullName: "United Nations Educational, Scientific and Cultural Organization",
    logo: "/img-logos/UNESCO_logo.webp",
    topic: "Preserving World Heritage in Conflict Zones",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value,
    types: [difficulty.value]
  },
  {
    mainName: "WHO",
    fullName: "World Health Organization",
    logo: "/img-logos/UNESCO_logo.webp",
    topic: "Global Response to Future Pandemics",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value,
    types: [difficulty.value]
  },
  {
    mainName: "COPOUS",
    fullName: "Committee on the Peaceful Uses of Outer Space",
    logo: "/img-logos/UNESCO_logo.webp",
    topic: "International Cooperation in Space Exploration",
    SignUpLink: "#",
    metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
    type: difficulty.value,
    types: [difficulty.value]
  }
])

const currentCommittee = ref(committees.value[0])


const committeeLevelToList = computed(() => {
  if (difficulty.value) {
    return committees.value.filter((committee) => committee.type === difficulty.value || committee.types?.includes(difficulty.value));
  }

  return [];
});

function setCommittee(committeeMainName: string = committees.value[0].mainName) {
  const foundCommittee = committees.value.find(c => c.mainName === committeeMainName)
  currentCommittee.value = foundCommittee ? foundCommittee : committees.value[0]
}

function handleCommand(command: string) {
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
    case Difficulty.UNI:
      difficulty.value = Difficulty.UNI;
      break;
    case Difficulty.HS:
      difficulty.value = Difficulty.HS;
      break;
  }

}
function handleClick() {
  const el = document.getElementById('content')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
onMounted(async () => {
  if (committeesState.value) {
    committees.value = committeesState.value
  } else {
    try {
      const res = await $fetch('/api/committees/committees')
      // support both shape: { fromQuery: { results: [...] } } and { results: [...] }
      const results = res?.fromQuery?.results ?? []
      const mapped = results.map((result: any) => ({
        mainName: result.properties["main-name"]?.rich_text?.[0]?.plain_text || '',
        fullName: result.properties["full-name"]?.rich_text?.[0]?.plain_text || '',
        logo: result.properties["logo"]?.files?.[0]?.file?.url || '/img-logos/chairs_choice.webp',
        topic: result.properties["topic"]?.rich_text?.[0]?.plain_text || '',
        description: result.properties["description"]?.rich_text?.[0]?.plain_text || '',
        SignUpLink: "https://mymun.com/conferences/kamun-2025",
        metaImage: "/img/United_Nations_General_Assembly_Hall_(3).webp",
        type: result.properties["committee-type"]?.multi_select?.[0]?.name || difficulty.value,
         types: result.properties["committee-type"]?.multi_select?.map((t: any) => {
          return t.name
         }),
         spots: result.properties["size"]?.number || 0
      })) as Committee[]

      console.log(res)
      console.log(results)

      if (mapped.length) {
        committees.value = mapped
        committeesState.value = mapped
      }
    } catch (err) {
      console.error('Failed to load committees', err)
      // keep local defaults if fetch fails
    }
  }

  // ensure currentCommittee is set to a valid value after load
  currentCommittee.value = committees.value[0] ?? currentCommittee.value
})
</script>
