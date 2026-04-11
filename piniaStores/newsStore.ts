import {defineStore} from 'pinia'
import {formatDate} from "../utils/formatDate"

interface news{
    id:string,
    title:string,
    content:string,
    date:string,
    author:string,
    type:string,
    postUrl:string,
}
export const useNewsStore = defineStore("news",{
     state: ()=>{
        return{
            news: [] as news[]
        }
    },
    getters: {
        getScheduleNews:()=>{
            
        },  
        getAnnouncements:(state)=>{
            if(state.news)
            return state.news.filter((e:news)=>{
                e.type == "Announcement"
            })
        },
        getKamunNews:(state)=>{
             if(state.news)
            return state.news.filter((e:news)=>{
                e.type == "kamun"
            })
        }
    },
    actions:{
        async fetchNews(){
            try{
                const {data} = await useFetch<news[]>('/api/news/news',{
                    key:"news-data"
                })
                console.log(data.value)
                if(data.value){
                    if(Array.isArray(data.value)){
                        data.value.forEach((item:news)=>{
                            if(item.date){
                                item.date = formatDate(item.date)
                            }
                        })
                    }
                    this.$state.news = data.value
                }
                else{
                    console.log("no news data")
                }

            }
            catch(err){
                console.log(err)
                console.log("Failed to load news")
            }
        }
    }
}
   

)