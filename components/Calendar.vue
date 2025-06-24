<template>
  <div class="calendar-wrapper">
    <full-calendar :options="calendarOptions" style="max-height:100vh; min-height: 50vh;"></full-calendar>
    <el-dialog v-model="dialogVisible" title="Event Details" width="400px" :before-close="handleDialogClose">
      <template #title>
        <div>
          <strong>{{ selectedEvent?.title }}</strong><br>
          <span v-if="selectedEvent">{{ formatEventTime(selectedEvent) }}</span>
        </div>
      </template>
      <div v-if="selectedEvent">
        <p><strong>Summary:</strong> {{ selectedEvent.title }}</p>
        <p><strong>Time:</strong> {{ formatEventTime(selectedEvent) }}</p>
        <p><strong>Location:</strong> <a href="https://maps.app.goo.gl/BAUtNgZAamQyJjLB7" target="_blank">Karlshochshule</a></p>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">Close</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

const dialogVisible = ref(false)
const selectedEvent = ref<any>(null)

function handleEventClick(info: any) {
  selectedEvent.value = info.event
  dialogVisible.value = true
}

function handleDialogClose() {
  dialogVisible.value = false
  selectedEvent.value = null
}

function formatEventTime(event: any) {
  if (!event) return ''
  const start = event.start
  const end = event.end
  if (!start || !end) return ''
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return `${start.toLocaleString(undefined, options)} - ${end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
}

// Helper to get all Tuesdays in the current month
function getTuesdaysOfMonth(year: number, month: number) {
    const dates = []
    const date = new Date(year, month, 1)
    while (date.getMonth() === month) {
        if (date.getDay() === 2) { // 2 = Tuesday
            dates.push(new Date(date))
        }
        date.setDate(date.getDate() + 1)
    }
    return dates
}

// Generate events for every Tuesday 7pm-9pm in current month
function generateRegularMeetings() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const tuesdays = getTuesdaysOfMonth(year, month)
    return tuesdays.map(d => ({
        title: 'Regular Meeting',
        start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 0, 0),
        end: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 21, 0, 0),
        allDay: false
    }))
}

const regularMeetings = computed(() => generateRegularMeetings())

const calendarOptions = ref({
    plugins: [interactionPlugin, listPlugin, dayGridPlugin],
    initialView: 'listMonth',
    views: {
      listDay: { buttonText: 'list day' },
      listWeek: { buttonText: 'list week' },
      listMonth: { buttonText: 'list month' },
      dayGridMonth:{buttonText:'Grid View'}
    },
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'listDay,listWeek,listMonth,dayGridMonth'
    },
    events: regularMeetings.value,
    nowIndicator: true,
    editable: true,
    eventClick: handleEventClick,
})

// Ensure events are updated reactively when regularMeetings changes
watch(regularMeetings, (newEvents) => {
    calendarOptions.value.events = newEvents
})
</script>

<style scoped>
.calendar-wrapper {
  min-width: 50%;
  min-height: 50%;
  max-height: 100vh;
  max-width: 90vw;
}
:deep(.fc-event) {
  cursor: pointer;
}
</style>
