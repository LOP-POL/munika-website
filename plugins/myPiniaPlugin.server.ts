import { useMetaStore } from "~/piniaStores/metaStore"
import { useNewsStore } from "~/piniaStores/newsStore"
export default defineNuxtPlugin(async ()=>{
    const metaStore = useMetaStore()
    const newsStore = useNewsStore()

    if(!metaStore.getAllEvents.length){
        metaStore.fetchEventsAndMeta()         
    }
    if(newsStore.news.length){
       newsStore.fetchNews()        
    }
    

})