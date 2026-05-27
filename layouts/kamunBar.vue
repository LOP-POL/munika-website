<script lang="ts" setup>
useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/jpeg',
            href: '/img-logos/Kamun2025Logo.png',
        },
    ],
})

const mainCon = ref<HTMLElement>()
const router = useRouter();
const onBack = () => {
    router.push("/");
}

const menuVisible = ref(false)
const menuSwitch = ref<boolean>(false)

const pageWidth = ref(0)

const routes = ref([
    {
        page:'Home',
        path:'/KAMUN'
    },
    {
        page:'Team',
        path:'/KAMUN/team'
    },
    // {
    //     page:'Collaborations',
    //     path:'/KAMUN/collaborations'
    // },
    // {
    //     page:'Committees',
    //     path:'/KAMUN/committees'
    // },
   
    {
        page:'Schedule',
        path:'/KAMUN/schedule'
    },

    {
        page:'News',
        path:'/news'
    },
    {
        page:'MUNIKA',
        path:'/'
    },
   
])

const updatePageWidth = () => {
    pageWidth.value = document.body.clientWidth
    if(navMen.value){
        switchToButton((check(navMen.value)))
    }
}
const navMen = ref<HTMLElement | null>(null)

    // function to help chekc if the nav has overflwing routes
 function check(el:HTMLElement) { 
                let curOverf = el.style.overflow; 
                
                if ( !curOverf || curOverf === "visible" ) 
                    el.style.overflow = "hidden"; 
                
                let isOverflowing = el.clientWidth < el.scrollWidth
                    || el.clientHeight < el.scrollHeight; 
                
                el.style.overflow = curOverf; 
                
                return isOverflowing; 
            } 
    // function to switch to the button if the nav has overflowing routes
function switchToButton(change:boolean){
    
        menuSwitch.value = change

}
const metaStore = useMetaStore()

const kamunYear =  metaStore.getConferenceMeta[0].year ?? new Date().getFullYear()
onMounted(() => {
    metaStore.fetchEventsAndMeta()
    updatePageWidth()
    window.addEventListener('resize', updatePageWidth)

    if (router.currentRoute.value.meta.layout == 'kamun-bar') {
        document.documentElement.style.setProperty('--el-color-primary', 'var(--school-bus-yellow)')
        document.documentElement.style.setProperty('--theme-color', 'var(--school-bus-yellow)')
    }
    else {
        document.documentElement.style.setProperty('--el-color-primary', 'var(--munika-blue)')
        document.documentElement.style.setProperty('--theme-color', 'var(--munika-blue)')
    }
   
      

})

onUnmounted(() => {
    window.removeEventListener('resize', updatePageWidth)
})

import { ElIcon } from 'element-plus'
import { House, UserFilled, Collection, Notification, Star,Calendar, Document } from '@element-plus/icons-vue'
import { useMetaStore } from '~/piniaStores/metaStore';

function handleMenuClick() {
    menuVisible.value = false
}
</script>

<template>
    <el-container >
        <el-header class="main-page-header">

            <div class="title-holder">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/Kamun2025Logo.png"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">KAMUN {{kamunYear}}</span>
                </div>

                <span class="nav-menu" ref="navMen">
                    <el-button class="menu-toggle"
                        style="justify-self: right; background-color:var(--theme-color); border: none;  height:100%; border-radius:20px"
                        @click="menuVisible = true" v-if="pageWidth < 1200 || menuSwitch"  plain>
                        <img src="/img-styles/bars-solid.svg" alt="Menu" style="width: 24px; height: 24px;" />
                    </el-button>
                    <CustomNavMenu :routes="routes" :style="{ width: pageWidth < 1200 || menuSwitch? '100%' : 'auto', display: pageWidth < 1200 || menuSwitch ? 'none' : 'flex' }"></CustomNavMenu>
                    <!-- <el-menu mode="horizontal" :router="true" :ellipsis="false"  class="main-nav main-nav-show" active-text-color="#ffd04b"
                        :style="{ width: pageWidth < 900 ? '100%' : 'auto', display: pageWidth < 900 ? 'none' : 'flex' }">
                        <el-menu-item index="/KAMUN">Home</el-menu-item>
                        <el-menu-item index="/KAMUN/Team">Team</el-menu-item>
                        <el-menu-item index="/KAMUN/committees">Commitees</el-menu-item>
                        <el-menu-item index="/news">News</el-menu-item>
                        <el-menu-item class="special-menu-item" index="/">MUNIKA</el-menu-item>

                      
                    </el-menu> -->

                </span>
            </div>

        </el-header>


        <el-main class="main-content" ref="mainCon">
            <slot :pageWidth="pageWidth" />
        </el-main>

        <el-footer class="main-page-footer">
             <div class="footer-content">
                <div>
                    <ul>
                        <li>
                            <NuxtLink to="/" style="color: white;">&copy; Munika.ev 2026</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/datenSchutz" style="color: white;">Data Protection Information</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/impressum" style="color: white;">Impressum</NuxtLink>
                        </li>
                    </ul>
                </div>
                <ul class="social-media-list">
                    <li>
                        <a href="https://www.instagram.com/munika_ev_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==m"
                            target="_blank" rel="noopener" aria-label="Instagram">
                            <img src="/img-logos/instagram.png" alt="Instagram" style="width: 24px; height: 24px;" />
                            <div style="color: white;">munika_ev</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/kamun_org?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank" rel="noopener" aria-label="Instagram">
                            <img src="/img-logos/instagram.png" alt="Instagram" style="width: 24px; height: 24px;" />
                            <div style="color: white;">kamun_org</div>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:vorstand@munika.org" aria-label="Email">
                            <img src="/img-logos/email.png" alt="Email" style="width: 24px; height: 24px;" />
                            <div>Mail</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/munika/" target="_blank" rel="noopener"
                            aria-label="LinkedIn">
                            <img src="/img-logos/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;" />
                            <div>LinkedIn</div>
                        </a>
                    </li>
                </ul>
            </div>
        </el-footer>
    </el-container>
    <el-drawer v-model="menuVisible" direction="ltr" size="80%" :with-header="false" class="mobile-nav-drawer">
        <!-- Drawer content goes here -->
        <el-menu mode="vertical" :router="true" class="main-nav" active-text-color="#ffd04b" :ellipsis="false"
            @select="handleMenuClick">
            <el-menu-item index="/KAMUN">
                <el-icon>
                    <House />
                </el-icon>
                Home
            </el-menu-item>
            <el-menu-item index="/KAMUN/Team">
                <el-icon>
                    <UserFilled />
                </el-icon>
                Team
            </el-menu-item>
            <!-- <el-menu-item index="/KAMUN/committees">
                <el-icon>
                    <Collection />
                </el-icon>
                Committees
            </el-menu-item> -->

            <el-menu-item index="/news">
                <el-icon>
                    <Notification />
                </el-icon>
                News
            </el-menu-item>
             <el-menu-item index="/KAMUN/schedule">
                <el-icon>
                    <Calendar />
                </el-icon>
                Schedule
            </el-menu-item>

             <!-- <el-menu-item index="/KAMUN/collaborations">
                <el-icon>
                    <Document/>
                </el-icon>
                Collaborations
            </el-menu-item> -->



            <el-menu-item class="special-menu-item" index="/">
                <el-icon>
                    <Star />
                </el-icon>
                MUNIKA
            </el-menu-item>
        </el-menu>
        <template #footer>
            
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/Kamun2025Logo.png"
                            alt="kamun Logo" height="10%" width="10%"></span>
                  
                </div>
           
        </template>
    </el-drawer>
</template>
<style>
@import url("~/assets/css/kamun.css");
@import url('~/assets/css/main.css');
</style>