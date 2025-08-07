<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/jpeg',
      href: '/img-logos/MunikaLogo.jpg',
    },
  ],
})

const router = useRouter();
const onBack = () => {
    router.push("/");
}

const mainCon = ref<HTMLElement>()

const menuVisible = ref(false)

const pageWidth = ref(0)

const updatePageWidth = () => {
    pageWidth.value = document.body.clientWidth
}


onMounted(() => {
   
    updatePageWidth()
    window.addEventListener('resize', updatePageWidth)

    document.querySelectorAll('.main-section').forEach(node => {
        (node as HTMLElement).style.opacity = '0'
    })

    if(router.currentRoute.value.meta.layout == 'kamun-bar'){
        document.documentElement.style.setProperty('--el-color-primary', 'var(--school-bus-yellow)')
        document.documentElement.style.setProperty('--theme-color', 'var(--school-bus-yellow)')
    }
    else{
         document.documentElement.style.setProperty('--el-color-primary', 'var(--munika-blue)')
        document.documentElement.style.setProperty('--theme-color', 'var(--munika-blue)')
    }

})


onUnmounted(() => {
    window.removeEventListener('resize', updatePageWidth)
})

import { ElIcon } from 'element-plus'
import { House, Notification, Document, User, Star } from '@element-plus/icons-vue'

function handleMenuClick() {
    menuVisible.value = false
}
</script>

<template>
   
    <el-container class="super-container">
        <el-header class="main-page-header">

            <div class="title-holder">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/MunikaLogo.jpg"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">MUNIKA e.V</span>
                </div>

                <span class="nav-menu">
                    <el-button class="menu-toggle" style="justify-self: right; background-color: transparent; border: none;"  @click="menuVisible = true" v-if="pageWidth < 900" 
                        circle plain>
                        <img src="/img-styles/bars-solid.svg" alt="Menu" style="width: 24px; height: 24px;" />
                    </el-button>
                       
                    <el-menu mode="horizontal" :ellipsis="false" :router="true" class="main-nav main-nav-show" active-text-color="var(--theme-color)"
                        :style="{ width: pageWidth < 900 ? '100%' : 'auto',display: pageWidth < 900 ? 'none' : 'flex' }">
                        <el-menu-item index="/">Home</el-menu-item>

                        <el-menu-item index="/news">News</el-menu-item>
                        <el-menu-item index="/Impressum">Impressum</el-menu-item>
                        <el-menu-item index="/join">Join us</el-menu-item>
                        <el-menu-item class="special-menu-item" index="/KAMUN">KAMUN</el-menu-item>
                    </el-menu>

                </span>
            </div>
           
        </el-header>


        <el-main class="main-content" ref="mainCon">
            <slot />
        </el-main>


        <el-footer class="main-page-footer">
            <div class="footer-content"
                style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div>
                    &copy; Munika.ev 2025
                </div>
                <ul class="social-media-list"
                    style="display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0;">
                    <li>
                        <a href="https://www.instagram.com/munika_ev?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==m" target="_blank" rel="noopener" aria-label="Instagram">
                            <img src="/img-logos/instagram.png" alt="Instagram" style="width: 24px; height: 24px;" />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:vorstand@munika.org" aria-label="Email">
                            <img src="/img-logos/email.png" alt="Email" style="width: 24px; height: 24px;" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/munika/" target="_blank" rel="noopener" aria-label="LinkedIn">
                            <img src="/img-logos/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;" />
                        </a>
                    </li>
                </ul>
            </div>

        </el-footer>
    </el-container>
    <el-drawer v-model="menuVisible" direction="ltr" size="50%" :with-header="true" class="mobile-nav-drawer">
        <!-- Drawer content goes here -->
         
        <el-menu mode="vertical" :router="true" class="main-nav" active-text-color="var(--theme-color)" :ellipsis="false" style="height: 100%;" @select="handleMenuClick">
            <el-menu-item index="/">
                <el-icon><House /></el-icon>
                Home
            </el-menu-item>
            <el-menu-item index="/news">
                <el-icon><Notification /></el-icon>
                News
            </el-menu-item>
            <el-menu-item index="/Impressum">
                <el-icon><Document /></el-icon>
                Impressum
            </el-menu-item>
            <el-menu-item index="/join">
                <el-icon><User /></el-icon>
                Join us
            </el-menu-item>
            <el-menu-item class="special-menu-item" index="/KAMUN">
                <el-icon><Star /></el-icon>
                KAMUN
            </el-menu-item>
        </el-menu>
        <template #footer>
                 <div class="title-holder" style="border-radius: 10px;">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/MunikaLogo.jpg"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">MUNIKA e.V</span>
                </div>
                </div>
        </template>
        
    </el-drawer>
</template>
<style>
@import url("~/assets/css/main.css") 
/* This one thing is helping to hold up the whole color switching thing , Do not remove this or it will not work properly */
</style>