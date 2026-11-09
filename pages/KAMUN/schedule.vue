<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import Fuse from "fuse.js";

import headAndC from "~/components/headAndC.vue"; // added
import { useMetaStore, type ConferenceEvents } from "~/piniaStores/metaStore";
import OptionsSelectore from "~/components/OptionsSelectore.vue";
import { Location, Timer } from "@element-plus/icons-vue";
import { type ExtendedProps } from "~/piniaStores/metaStore";
import { Search } from "@lucide/vue";
definePageMeta({ layout: "kamun-bar" });

const metaStore = useMetaStore();

const { getScheduleEvents } = storeToRefs(metaStore);

type ScheduleEvent = ConferenceEvents & {
    start: Date;
    name: string | undefined;
    Name: string | undefined;
    end: Date;
    description: string;
    extendedProps: ExtendedProps;
};

// Helpers to format/normalize event dates and times
function toDate(v: any): Date | null {
    if (!v) return null;
    if (v instanceof Date) return v;
    if (typeof v === "string") return new Date(v);
    if (v && v.start) return new Date(v.start);
    return null;
}

function formatTime(d: Date | null) {
    if (!d) return "";
    return d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
}
// Replace previous locale label with dd-mm-yyyy
function formatDisplayDateKey(dayKey: string) {
    const [y, m, dd] = dayKey.split("-").map(Number);
    const day = String(dd).padStart(2, "0");
    const month = String(m).padStart(2, "0");
    const year = String(y);
    return `${day}-${month}-${year}`;
}
const daysInSchedule = ref<string[]>(["Friday", "Saturday", "Sunday"]);

function getFullDayName(date: Date | null): string {
    if (!date) return "";
    var d = date.toLocaleDateString(undefined, { weekday: "long" });
    if (!daysInSchedule.value.includes(d)) {
        daysInSchedule.value.push(d);
    }
    return date.toLocaleDateString(undefined, { weekday: "long" });
}

// computed grouped events by local day
const groupedEvents = computed(() => {
    const raw =
        getScheduleEvents && "value" in getScheduleEvents
            ? (getScheduleEvents.value ?? [])
            : (getScheduleEvents ?? []);
    // normalize and filter
    const normalized: ScheduleEvent[] = raw
        .map((e: any) => {
            const start = toDate(e.start ?? e.startDate ?? e.properties?.start);
            const end = toDate(e.end ?? e.endDate ?? e.properties?.end);
            const description =
                e.extendedProps?.description ??
                e.description ??
                e.properties?.description?.rich_text?.[0]?.plain_text ??
                "";
            return {
                ...e,
                start,
                end,
                description,
            };
        })
        .filter((e: ScheduleEvent) => e.start);

    // group by local date key YYYY-MM-DD
    const groups: Record<string, ScheduleEvent[]> = {};
    normalized.sort(
        (a: ScheduleEvent, b: ScheduleEvent) =>
            (a.start?.getTime() ?? 0) - (b.start?.getTime() ?? 0),
    );
    normalized.forEach((ev: any) => {
        const s = ev.start as Date;
        const key = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
        const day = getFullDayName(ev.start as Date);
        if (!groups[key]) groups[key] = [];
        groups[key].push(ev);
    });

    return Object.keys(groups)
        .sort()
        .map((k) => ({
            dateKey: k,
            label: formatDisplayDateKey(k),
            events: groups[k],
        }));
});

// search algorithm

const querySearch = ref("");
const searchableEvents = computed(() =>
    groupedEvents.value.flatMap((day) => day.events),
);
const fuse = computed(
    () =>
        new Fuse(searchableEvents.value, {
            keys: [
                "title",
                "Name",
                "name",
                "description",
                "extendedProps.location",
          ],
          threshold: 0.35,
        }),
);

const queryResults = computed(() => {
    const query = querySearch.value.trim();
    return query ? fuse.value.search(query) : [];
});

// controls for the dialog that opens the event
const selectedEvent = ref<ScheduleEvent | null>(null);
const dialogVisible = ref(false);

// controls for the search Dialog
const searchDialogVisible = ref(false);

function selectEvent(event: ScheduleEvent) {
    dialogVisible.value = true;
    selectedEvent.value = event;
}

function handleDialogClose() {
    dialogVisible.value = false;
    selectedEvent.value = null;
}

function handleSearchClose() {
  querySearch.value = "";
  searchDialogVisible.value = false;
}

// optional: expose a refresh that store might provide
const refreshSchedule = () => {
    metaStore.fetchEventsAndMeta?.();
};

const currentEvent = ref<string>("Friday");
const currentColor = ref<string>("#28afb0");
const changeCurrentEvent = (value: string, color: string) => {
    currentEvent.value = value;
    currentColor.value = color;
};
</script>

<template>
    <main class="main-con">
        <!-- Intro using headAndC -->
        <head-and-c :inner="true">
            <template #title> Schedule & Calendar </template>
            <p>
                You can download the Kamun 2026 schedule as an .ics file to add
                it to your calendar:
                <br />
                <a href="/kamun2036.ics" download
                    >Download KAMUN2026 schedule (ICS)</a
                >.
            </p>
        </head-and-c>

        <!-- Render one block per day -->
        <section class="events-sticky max-w-3xl mx-auto">
            <div
                v-for="day in groupedEvents.filter(
                    (e) => getFullDayName(e.events[0].start) == currentEvent,
                )"
                :key="day.dateKey"
                class="day-group max-h-screen"
            >
                <div class="dateShow">
                    <p class="weekday">
                        {{ getFullDayName(day.events[0].start) }}
                    </p>
                    <p class="fulldate">{{ day.label }}</p>

                    <OptionsSelectore
                        :initialValue="currentEvent"
                        :categories="`Day`"
                        :options="daysInSchedule"
                        @return-value="changeCurrentEvent"
                        @openSearch="() => (searchDialogVisible = true)"
                        :search="true"
                        ref="dayChoice"
                    />
                </div>
                <div class="events-section">
                    <div
                        v-for="(event, index) in day.events"
                        :key="index"
                        class="event-card"
                        @click="selectEvent(event)"
                    >
                        <!-- title -->
                        <p class="event-title" @click="selectEvent(event)">
                            {{ event.title ?? event.Name ?? event.name }}
                        </p>
                        <!-- time -->
                        <p class="event-time">
                            <el-icon><Timer /></el-icon>
                            <span>{{ formatTime(event.start) }}</span>
                            <span v-if="event.end">
                                — {{ formatTime(event.end) }}</span
                            >
                        </p>
                        <!-- description -->
                        <p class="event-description">{{ event.description }}</p>

                        <p class="event-location">
                            <el-icon>
                                <Location />
                            </el-icon>
                            <a
                                :href="
                                    event.extendedProps.locationLink ??
                                    '#calendar'
                                "
                                target="_blank"
                                >{{ event.extendedProps.location }}</a
                            >
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="calendar-section mx-auto max-w-3xl">
            <h1>Calendar</h1>
            <Calendar />
        </section>
    </main>

    <el-dialog
        v-if="dialogVisible"
        v-model="dialogVisible"
        :before-close="handleDialogClose"
        style="
            background-color: #1b1b1e;
            border-radius: 20px;
            border: solid 2px white;
        "
    >
        <div class="event-card-dia" v-if="selectedEvent">
            <!-- title -->
            <p class="event-title">
                {{
                    selectedEvent.title ??
                    selectedEvent.Name ??
                    selectedEvent.name
                }}
            </p>
            <!-- time -->
            <p class="event-time">
                <el-icon><Timer /></el-icon>
                <span>{{ formatTime(selectedEvent.start) }}</span>
                <span v-if="selectedEvent.end">
                    — {{ formatTime(selectedEvent.end) }}</span
                >
            </p>
            <!-- description -->
            <p class="event-description">{{ selectedEvent.description }}</p>

            <p class="event-location">
                <el-icon>
                    <Location />
                </el-icon>
                <a
                    :href="
                        selectedEvent.extendedProps.locationLink ?? '#calendar'
                    "
                    target="_blank"
                    >{{ selectedEvent.extendedProps.location }}</a
                >
            </p>
        </div>
        <head-and-c v-else>
            <template #title> No event selected </template>
        </head-and-c>
    </el-dialog>

    <el-dialog

        v-if="searchDialogVisible"
        v-model="searchDialogVisible"
        :before-close="handleSearchClose"
        style="
            background-color: #1b1b1e;
            border-radius: 20px;
            border: solid 2px white;
        "

    >
        <!-- search section -->
        <div class="search-content">
            <label class="search-input">
                <Search />
                <input v-model="querySearch" type="search" placeholder="registration"/>
            </label>

            <!-- results -->
            <div v-if="queryResults.length" class="search-results">
                <div
                    class="event-card-dia"
                    v-for="(result, index) in queryResults"
                    :key="index"
                    style="margin:20px; padding:10px;"
                >
                    <!-- title -->
                    <p class="event-title">
                        {{
                            result.item.title ??
                            result.item.Name ??
                            result.item.name
                        }}
                    </p>
                    <!-- time -->
                    <p class="event-time">
                        <el-icon><Timer /></el-icon>
                        <span>{{ formatTime(result.item.start) }}</span>
                        <span v-if="result.item.end">
                            — {{ formatTime(result.item.end) }}</span
                        >
                    </p>
                    <!-- description -->
                    <p class="event-description">
                        {{ result.item.description }}
                    </p>

                    <p class="event-location">
                        <el-icon>
                            <Location />
                        </el-icon>
                        <a
                            :href="
                                result.item.extendedProps.locationLink ??
                                '#calendar'
                            "
                            target="_blank"
                            >{{ result.item.extendedProps.location }}</a
                        >
                    </p>
                </div>
            </div>
            <div v-else class="search-results search-empty">
                <head-and-c :inner="true" style="background-color:#1b1b1e;" >
                    <template #title> No results </template>
                </head-and-c>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped>
h1 {
    text-decoration: underline solid var(--french-gray) 5%;
    text-underline-offset: 10px;
}

.events-sticky {
    overflow-x: hidden;
    transform-style: preserve-3d;
    perspective: 100px;
    margin-top: 10px;
    position: relative;
    border-radius:20px;
}

.day-group {
    border-radius: 20px;
    margin-bottom: 16px;
    padding: 0;
    background-color: #1b1b1e;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.day-group .dateShow {
    font-size: 1.5em;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
    width: 100%;


    /* border-top-right-radius: inherit; */
    height: fit-content;
    position: absolute;
    z-index: 2;
    top: 0px;
    box-shadow:
        inset -30px -50px 50px #1b1b1e,
        0px 50px 50px 10px #1b1b1e;
}

.day-group:nth-child(1) .dateShow {
    background-color: v-bind(currentColor);
}

.weekday,
.fulldate {
    font-weight: bold;
    /*shadow-grey*/
    /*carbon-black 1B1B1E*/
    color: #1b1b1e;
    background-color: white;
    padding: 10px;
    border-radius: 20px;
    border: solid 2px #1b1b1e;
    box-shadow: 0px 0px 10px #1b1b1e;
    font-size: 1.5rem;
}

.fulldate {
    color: var(--french-gray);
}

.events-section {
    display: flex;
    flex-direction: column;
    border-radius: inherit;
    justify-content: center;
    place-items: center;
    margin-top: 5%;
}

.event-card,
.event-card-dia {
    padding: 5px;
    margin: 5px;
    border-bottom: solid 4px white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 90%;
    min-height: 200px;
    max-height: fit-content;
}
.event-card:nth-child(1) {
    margin-top: 60px;
}
.event-card-dia {
    border: none;
}

.event-card:hover {
    transform: translateX(20px);
}

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
    color: white;
}

.event-location {
    color: var(--theme-color);
}

.search-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.search-input {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 32rem;
}

.search-input input {
    flex: 1;
    min-width: 0;
    height:50px;
    border-radius:20px;
    border:solid 1px black;
    padding:5px;
}

.search-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
    gap:2.5rem;
}

.search-results .event-card-dia {
    width: min(100%, 36rem);
    box-sizing: border-box;
    height: auto;
    min-height: 200px;
    max-height: none;
    flex: 0 0 auto;
    overflow-wrap: anywhere;
    border-bottom:solid 5px white;
}

.search-empty {
    text-align: center;
}

@media (max-width: 768px) {
    .day-group .dateShow {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        font-size: 10px;
    }

    .events-section {
        transform: translateY(50px);
    }
    .event-card {
        min-height: fit-content;
    }
    .event-card:nth-child(1) {
        margin-top: 25px;
    }

    .weekday,
    .fulldate {
        margin: 10px;
        display: none;
    }
}
</style>
