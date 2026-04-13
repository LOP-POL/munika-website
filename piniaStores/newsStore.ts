import { defineStore } from 'pinia'
import { formatDate } from "../utils/formatDate"

interface news {
    id: string,
    title: string,
    content: string,
    date: string,
    author: string,
    type: string,
    postUrl: string,
}
export const useNewsStore = defineStore("news", {
    state: () => {
        return {
            news: [] as news[]
        }
    },
    getters: {
        getScheduleNews: () => {

        },
        getAnnouncements: (state) => {
            if (state.news)
                return state.news.filter((e: news) => {
                    e.type == "Announcement"
                })
        },
        getKamunNews: (state) => {
            if (state.news)
                return state.news.filter((e: news) => {
                    e.type == "kamun"
                })
        }
    },
    actions: {
        async fetchNews() {
            try {
                const { data } = await useFetch<news[]>('/api/news/news', {
                    key: "news-data"
                })
                // I am trying to connect the data that will be coming in in form of markdown for the content plugin and that from notion
                const { data: posts } = await useAsyncData("newsContent", () => queryCollection("News").all())

                if (data.value && posts.value) {

                    if (Array.isArray(data.value) && Array.isArray(posts.value)) {
                        data.value.forEach((item: news) => {
                            if (item.date) {
                                item.date = formatDate(item.date)
                            }
                        })
                        posts.value.forEach(
                            (item: news) => {
                                if (item.date) {
                                    item.date = formatDate(item.date)
                                }
                            })

                    }



                    this.$state.news = data.value.concat((posts.value as news[]))
                }
                else {
                    console.log("no news data")
                }

            }
            catch (err) {
                console.log(err)
                console.log("Failed to load news")
            }
        }
    }
}


)