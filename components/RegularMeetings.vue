<style scoped>
.events-sticky {
    transform-style: preserve-3d;
    perspective: 100px;
    margin-top: 10px;
    position: relative;
    max-height: fit-content;
    overflow-y: auto;

}

.day-group {
    border-radius: 20px;
    padding: 0;
    background-color: white;
    width: 100%;
    overflow-x: hidden;
}

.day-group .dateShow {
    font-size: 2em;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
    width: 95%;
    border-top-left-radius: inherit;
    /* border-top-right-radius: inherit; */
    height: 60px;

    z-index: 2;
    top: 0px;
    box-shadow: inset -30px -50px 50px black, 0px 50px 50px 10px black;
}


@media (max-width: 768px) {
    .day-group .dateShow {
        flex-direction: column;
        align-items: flex-start;

        font-size: 10px;
    }

    .weekday,
    .fulldate {
        margin: 10px;
        display: none;

    }
}

.day-group:nth-child(1) .dateShow {
    background-color: v-bind(currentColor);
}




.weekday,
.fulldate {
    font-weight: bold;
    color: black;
    background-color: white;
    padding: 10px;
    border-radius: 20px;
    border: solid 2px black;
    box-shadow: 0px 0px 10px black;
}

.fulldate {

    color: var(--french-gray)
}

.events-section {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    border-radius: inherit;
    justify-content: center;
    place-items: center;
    margin: 20px;
}

.event-card {
    padding: 8px;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: solid 1px white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    width: 90%;
    border-radius: inherit;
    max-height: fit-content;
    border-radius: 10px;
    border-left: solid 5px var(--border-primary);
    border-bottom: solid 5px var(--border-accent);
}

/* .event-card:hover {
    transform: translateX(20px);

} */

.event-title {
    font-weight: 600;
    margin: 0 0 4px;
}

.event-time {
    margin: 0 0 6px;
    color: var(--french-gray);
    font-size: 0.95rem;

}

.event-description {
    margin: 0;
    color: black;
}

.event-location {
    color: var(--theme-color)
}
</style>
<template>
    <section class="events-sticky">

        <div v-if="regularMeeting" class="events-section">
            <div class="event-card">
                <!-- title -->
                <p class="event-title">{{ meetingTitle }}</p>
                <!-- time -->
                <div class="event-time">
                    <p>{{ meetingDate }}</p>
                    <el-icon>
                        <Timer />
                    </el-icon> <span>{{ meetingStartTime }}</span>
                    <span v-if="meetingEndTime"> — {{ meetingEndTime }}</span>
                </div>
                <!-- description -->
                <p class="event-description">{{ meetingDescription }}</p>

                <p class="event-location">
                    <el-icon>
                        <Location />
                    </el-icon>
                    <a :href="'#calendar'" target="_blank">{{ meetingLocation }}</a>
                </p>

                <el-button v-if="extraTrue" size="small" @click="handleReadMore">
                    {{ readMoreText }}
                </el-button>
                <p>
                    <ContentRenderer v-if="regularMeeting && readMore" :value="regularMeeting" />
                </p>
            </div>
        </div>
        <div v-else class="events-section">
            <p>Loading regular meeting information...</p>

        </div>

    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Location, Timer } from '@element-plus/icons-vue'


const readMore = ref<boolean>(false);
const readMoreText = ref<string>('read more')


function handleReadMore() {
    readMoreText.value = readMoreText.value === 'read more' ? 'close' : 'read more'
    readMore.value = !readMore.value
}
// Get Tuesday of the current week
function getTuesdayOfWeek(date: Date = new Date()): Date {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 2) // adjust when day is Sunday
    return new Date(d.setDate(diff))
}

// Format date to YYYY-MM-DD for comparison
function formatDateForComparison(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Fetch the regular meeting content
const { data: regularMeeting } = await useAsyncData('regularMeeting', () => queryCollection('meetings').first())

const today = new Date()
const currentDate = formatDateForComparison(today)
const tuesdayOfWeek = getTuesdayOfWeek(today)

// Helper to convert time string (HH:MM) to time format
function formatTimeString(timeStr: string): string {
    if (!timeStr) return ''
    return timeStr
}

// Helper to parse date and create a Date object
function parseDate(dateStr: string): string | null {
    if (!dateStr) return null
    try {
        return formatDate(dateStr)
    } catch {
        return null
    }
}

const currentColor = ref<string>('var(--special-green)')

const defaultData = {
    title: 'No Meeting this week',
    date: tuesdayOfWeek,
    startTime: '19:00',
    endTime: '20:30',
    location: 'Karlshochschule',
    description: 'No Debate this week',
    extra:false
}

function isDateInCurrentWeek(dateToCheck:string) {
  const now = new Date();

  // Get current day of week (0 = Sunday, 6 = Saturday)
  const currentDay = now.getDay();

  // Calculate Monday of current week
  const monday = new Date(now);
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  // Calculate Sunday of current week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const checkDate = new Date(dateToCheck);

  return checkDate >= monday && checkDate <= sunday;
}

// Determine if queried data matches today's date
const shouldUseQueried = computed(() => {
    if (!regularMeeting.value) {
        return false
    }
    const meeting = regularMeeting.value
    if (!meeting.date) return false
    return isDateInCurrentWeek(meeting.date)
})

// Computed values for the regular meeting display
const meetingData = computed(() => {
    if (shouldUseQueried.value) {
        return regularMeeting.value
    }
    return defaultData
})

const extraTrue  = computed<boolean>(()=>{
    if (shouldUseQueried.value) {
        if(regularMeeting.value?.extra)
        return regularMeeting.value?.extra
    }
    return false
})

const meetingTitle = computed(() => meetingData.value?.title || 'Regular Meeting')
const meetingDate = computed(() => parseDate(meetingData.value?.date instanceof Date ? meetingData.value.date.toISOString().split('T')[0] : meetingData.value?.date ?? '2026-05-19'))
const meetingStartTime = computed(() => formatTimeString(meetingData.value?.startTime ?? '19:00'))
const meetingEndTime = computed(() => formatTimeString(meetingData.value?.endTime ?? '20:30'))
const meetingDescription = computed(() => meetingData.value?.description || 'We are having a debate today')
const meetingLocation = computed(() => meetingData.value?.location || 'Karlshochschule')


</script>
