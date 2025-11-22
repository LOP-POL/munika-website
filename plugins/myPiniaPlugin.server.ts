import { useMetaStore } from "~/piniaStores/metaStore"
export default defineNuxtPlugin(async ()=>{
    const metaStore = useMetaStore()

    if(!metaStore.getAllEvents.length){
        metaStore.fetchEventsAndMeta()         
    }

})