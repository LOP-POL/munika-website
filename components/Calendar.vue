<template>
  <div class="calendar-wrapper">
    <div class="month-nav" style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center;">
      <el-button @click="previousMonth" size="small">← Previous</el-button>
      <span style="min-width: 150px; text-align: center; font-weight: bold;">
        {{ currentMonthYear }}
      </span>
      <el-button @click="nextMonth" size="small">Next →</el-button>
    </div>
    <el-button class="toggle-toolbar-btn" @click="showToolbar = !showToolbar" size="small" style="margin-bottom:8px;">
      {{ showToolbar ? 'Hide Calendar Views' : 'Show Calendar Views' }}
    </el-button>
    <full-calendar
      :options="calendarOptionsWithToolbar"
      style="max-height:80vh; min-height: 50vh;"
      ref="calendarRef"
    ></full-calendar>
    <el-dialog v-model="dialogVisible" title="Event Details" width="500px" height="500px" :before-close="handleDialogClose">
      <template #title>
        <div>
          <strong>{{ selectedEvent?.title }}</strong><br>

        </div>
      </template>
      <div v-if="selectedEvent">
        <p><strong>Description:</strong> </p>
        <p>{{ selectedEvent.extendedProps.description }}</p>
        <p><strong>Time:</strong> {{ formatEventTime(selectedEvent) }}</p>
        <p><el-icon><Location /></el-icon> <strong>Location:</strong> <a :href="selectedEvent.extendedProps.locationLink??'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7'" target="_blank">{{selectedEvent.extendedProps.location??'Karlshochshule'}}</a></p>
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
import iCalendarPlugin from '@fullcalendar/icalendar'
import { Location } from '@element-plus/icons-vue'

const dialogVisible = ref(false)
const selectedEvent = ref<any>(null)

function handleEventClick(info: any) {
  selectedEvent.value = info.event
  dialogVisible.value = true
  console.log(info.event.extendedProps.location)
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

const currentDate = ref(new Date())

const currentMonthYear = computed(() => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
  return currentDate.value.toLocaleString(undefined, options)
})

function previousMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
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
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    const tuesdays = getTuesdaysOfMonth(year, month)
    return tuesdays.map(d => ({
        title: 'Regular Meeting',
        start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 0, 0),
        end: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 21, 0, 0),
        extendedProps:{locationLink:'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7',description:"Usually a mock debate, with a group dinner after",location:'Karlshochschule'},
        color:"#000",
        allDay: false
    }))
}

const regularMeetings = computed(() => generateRegularMeetings())

const kamun2025Events = [
  // --- FRIDAY ---
  {
    title: "Registration",
    start: new Date("2025-12-05T10:30:00Z"),
    end: new Date("2025-12-05T12:30:00Z"),
    location: "Karlshochschule International University, Karlstraße 36–38, 76133 Karlsruhe, Germany",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Registration', location: 'Karlshochschule International University', locationLink: 'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7' }
  },
  {
    title: "Opening Ceremony",
    start: new Date("2025-12-05T12:30:00Z"),
    end: new Date("2025-12-05T13:30:00Z"),
    location: "Karlshochschule International University, Karlsruhe",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Opening ceremony with speeches and guest speakers', location: 'Karlshochschule International University', locationLink: 'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7' }
  },
  {
    title: "How to MUN Workshop",
    start: new Date("2025-12-05T13:30:00Z"),
    end: new Date("2025-12-05T14:30:00Z"),
    location: "Karlshochschule International University, Karlsruhe",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'This will be held at the same time as a special ROP session for H-UNSC', location: 'Karlshochschule International University', locationLink: 'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7' }
  },
  {
    title: "Break",
    start: new Date("2025-12-05T14:30:00Z"),
    end: new Date("2025-12-05T14:45:00Z"),
    location: "Karlshochschule International University",
    color: "#eab308",
    allDay: false,
    extendedProps: { description: 'Break', location: 'Karlshochschule International University', locationLink: 'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7' }
  },
  {
    title: "Session 1",
    start: new Date("2025-12-05T14:45:00Z"),
    end: new Date("2025-12-05T17:00:00Z"),
    location: "Karlshochschule International University",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Break', location: 'Karlshochschule International University', locationLink: 'https://maps.app.goo.gl/BAUtNgZAamQyJjLB7' }
  },
  {
    title: "Social with Dinner",
    start: new Date("2025-12-05T18:00:00Z"),
    end: new Date("2025-12-05T22:00:00Z"),
    location: "Anne-Frank-Haus, Moltkestraße 20, 76133 Karlsruhe",
    color: "#f97316",
    allDay: false,
    extendedProps: { description: 'A karaoke night with games and drinks.', location: 'Anne-Frank-Haus', locationLink: 'https://maps.app.goo.gl/bc29MevFyZx7Qs42A' }
  },

  // --- SATURDAY ---
  {
    title: "Breakfast",
    start: new Date("2025-12-06T07:30:00Z"),
    end: new Date("2025-12-06T08:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Coffee, Tea, Bread and more', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 2",
    start: new Date("2025-12-06T08:00:00Z"),
    end: new Date("2025-12-06T09:30:00Z"),
    location: "Fachschaft Mathematik am KIT, Gebäude 20.30, Englerstraße 2/Raum 0.002, 76131 Karlsruhe",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Debate', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 3",
    start: new Date("2025-12-06T10:00:00Z"),
    end: new Date("2025-12-06T12:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Debate in respective committees', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Lunch",
    start: new Date("2025-12-06T12:00:00Z"),
    end: new Date("2025-12-06T13:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Debate in respective committees', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 4",
    start: new Date("2025-12-06T13:00:00Z"),
    end: new Date("2025-12-06T14:30:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Debate in respective committees', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Break + Pictures",
    start: new Date("2025-12-06T14:30:00Z"),
    end: new Date("2025-12-06T15:00:00Z"),
    location: "Karlsruhe, Germany",
    color: "#eab308",
    allDay: false,
    extendedProps: { description: 'One for the memories', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 5",
    start: new Date("2025-12-06T15:00:00Z"),
    end: new Date("2025-12-06T17:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Back to debating , its probably getting serious now!', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Dinner",
    start: new Date("2025-12-06T17:00:00Z"),
    end: new Date("2025-12-06T18:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Dinner', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Social (Masquerade Ball)",
    start: new Date("2025-12-06T19:30:00Z"),
    end: new Date("2025-12-07T00:00:00Z"),
    location: "Hoepfner Schalander | Hochzeits- und Veranstaltungslocation, Haid-und-Neu-Straße 18, Karlsruhe",
    color: "#f97316",
    allDay: false,
    extendedProps: { description: 'Masquerade Ball. Think elegance with a side of Intrigue. dress to impress.', location: 'Hoepfner Schalander | Hochzeits- und Veranstaltungslocation', locationLink: 'https://maps.app.goo.gl/CGT2FUCbEGddb7BD8' }
  },

  // --- SUNDAY ---
  {
    title: "Breakfast",
    start: new Date("2025-12-07T08:30:00Z"),
    end: new Date("2025-12-07T09:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Coffee, Tea, Bread and more', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 6",
    start: new Date("2025-12-07T09:00:00Z"),
    end: new Date("2025-12-07T11:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Debate', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Lunch",
    start: new Date("2025-12-07T11:00:00Z"),
    end: new Date("2025-12-07T12:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'The real reason you are here', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Session 7",
    start: new Date("2025-12-07T12:00:00Z"),
    end: new Date("2025-12-07T14:00:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#3b82f6",
    allDay: false,
    extendedProps: { description: 'Debate in Committee rooms', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  },
  {
    title: "Closing Ceremony",
    start: new Date("2025-12-07T14:00:00Z"),
    end: new Date("2025-12-07T15:30:00Z"),
    location: "Fachschaft Mathematik am KIT",
    color: "#22c55e",
    allDay: false,
    extendedProps: { description: 'Thank you and come again ;)', location: 'Fachschaft Mathematik am KIT', locationLink: 'https://maps.app.goo.gl/7fzQTYn2SdPb2m6k8' }
  }
];


const calendarOptions = ref({
    plugins: [interactionPlugin, listPlugin, dayGridPlugin,iCalendarPlugin],
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
    events: regularMeetings.value.concat(kamun2025Events),
    nowIndicator: true,
    editable: true,
    eventClick: handleEventClick,
})

const showToolbar = ref(true)
const calendarRef = ref()

const calendarOptionsWithToolbar = computed(() => {
  // Clone the original options to avoid mutating it
  const opts = { ...calendarOptions.value }
  opts.headerToolbar = showToolbar.value
    ? {
        left: 'title',
        center: '',
        right: 'listDay,listWeek,listMonth,dayGridMonth'
      }
    : {
      left: 'title',
        center: '',
        right: ''
    }
  return opts
})

// Sync calendar view with currentDate changes
watch(currentDate, (newDate) => {
  if (calendarRef.value) {
    const calendarApi = calendarRef.value.getApi()
    calendarApi.gotoDate(newDate)
  }
})

// Ensure events are updated reactively when regularMeetings changes
watch(regularMeetings, (newEvents) => {
    calendarOptions.value.events = newEvents.concat(kamun2025Events)
})
</script>

<style scoped>
.calendar-wrapper {
  min-width: 50%;
  min-height: 50%;
  max-height: 100vh;
  max-width: 90vw;
  overflow-x: auto;
 background:#87CEFA ;
background: #22C1C3;
background: linear-gradient(0deg, var(--theme-color) 0%, var(--seasalt)75%,var(--seasalt)100%);
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 20px;
  border:2px dashed #0A100D;
  padding:10px;

}
a{
  color: #bbb;
}
.month-nav {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}
.toggle-toolbar-btn {
  display: none;
}
@media (max-width: 900px) {
  .calendar-wrapper {
    max-width: 100vw;
    min-width: 0;
    padding: 0;
  }
  .toggle-toolbar-btn {
    display: inline-block;
  }
  :deep(.fc-header-toolbar) {
    flex-wrap: wrap;
    gap: 4px;
  }
  :deep(.fc-toolbar-chunk) {
    flex: 1 1 100%;
    min-width: 0;
  }
  :deep(.fc-button) {
    font-size: 12px !important;
    padding: 2px 6px !important;
  }
}
:deep(.fc-event) {
  cursor: pointer;
}
/* Make calendar buttons more compact on all screens */
:deep(.fc-button) {
  font-size: 14px;
  padding: 4px 10px;
}
</style>
