import { defineStore } from "pinia";

export interface ConferenceMetaData {
    id: string,
    theme: string,
    startDate: Date,
    endDate: Date,
    membership: string,
    year: string,
}
export interface ExtendedProps {
    description: string,
    location: string,
    locationLink: string,
    typeOfEvent: string,
}
export interface ConferenceEvents {
    title: string,
    start: string,
    end: string,
    color: string,
    allDay: boolean,
    extendedProps: ExtendedProps

}
interface metaStoreState{
    meta:ConferenceMetaData,
    events:ConferenceEvents[]
}
export const useMetaStore = defineStore("meta", {
    state: ():metaStoreState => {
        return {
            meta:{} as ConferenceMetaData,
            events:[] as ConferenceEvents[]
        }
    },
    getters: {

        getAllEvents(state:metaStoreState):ConferenceEvents[] {
            return state.events
        },
        getScheduleEvents(state:metaStoreState):ConferenceEvents[]{
            return state.events.filter((e:ConferenceEvents)=>{
                return e.extendedProps.typeOfEvent=="schedule"
            })
        },
        getConferenceMeta(state:metaStoreState) {
            return state.meta;
        }
    },
    actions: {
        async fetchEventsAndMeta() {
            try {
                const {data}= await useFetch<{meta:ConferenceMetaData, events: ConferenceEvents[] }>('/api/meta/meta',
                    {
                        key:'meta-and-events-data',

                    }
                )
                if(data.value?.events){
                    this.$state.events = data.value?.events
                    this.$state.meta = data.value?.meta
                }
                
            }
            catch (err) {
                console.log(err)
            }
        },  
    }
})