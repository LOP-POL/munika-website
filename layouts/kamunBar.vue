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

const pageWidth = ref(0)

const updatePageWidth = () => {
    pageWidth.value = document.body.clientWidth
}

onMounted(() => {
    updatePageWidth()
    window.addEventListener('resize', updatePageWidth)

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
import { House, UserFilled, Collection, Notification, Star } from '@element-plus/icons-vue'

function handleMenuClick() {
    menuVisible.value = false
}
</script>

<template>
    <el-container>
        <el-header class="main-page-header">

            <div class="title-holder">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/Kamun2025Logo.png"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">KAMUN 2025</span>
                </div>

                <span class="nav-menu">
                    <el-button class="menu-toggle" style="justify-self: right; background-color: transparent; border: none;"  @click="menuVisible = true" v-if="pageWidth < 900" 
                        circle plain>
                        <img src="/img-styles/bars-solid.svg" alt="Menu" style="width: 24px; height: 24px;" />
                    </el-button>
                    <el-menu mode="horizontal" :router="true" :ellipsis="false"  class="main-nav main-nav-show" active-text-color="#ffd04b"
                        :style="{ width: pageWidth < 900 ? '100%' : 'auto', display: pageWidth < 900 ? 'none' : 'flex' }">
                        <el-menu-item index="/KAMUN">Home</el-menu-item>
                        <el-menu-item index="/KAMUN/Team">Team</el-menu-item>
                        <el-menu-item index="/KAMUN/committees">Commitees</el-menu-item>
                        <el-menu-item index="/news">News</el-menu-item>
                        <el-menu-item class="special-menu-item" index="/">MUNIKA</el-menu-item>

                      
                    </el-menu>

                </span>
            </div>
          
        </el-header>


        <el-main class="main-content" ref="mainCon">
            <slot :pageWidth = "pageWidth" />
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
    <el-drawer v-model="menuVisible" direction="ltr" size="80%" :with-header="false" class="mobile-nav-drawer">
        <!-- Drawer content goes here -->
        <el-menu
            mode="vertical"
            :router="true"
            class="main-nav"
            active-text-color="#ffd04b"
            :ellipsis="false"
            @select="handleMenuClick"
        >
            <el-menu-item index="/KAMUN">
                <el-icon><House /></el-icon>
                Home
            </el-menu-item>
            <el-menu-item index="/KAMUN/Team">
                <el-icon><UserFilled /></el-icon>
                Team
            </el-menu-item>
            <el-menu-item index="/KAMUN/committees">
                <el-icon><Collection /></el-icon>
                Committees
            </el-menu-item>
            <el-menu-item index="/news">
                <el-icon><Notification /></el-icon>
                News
            </el-menu-item>
            <el-menu-item class="special-menu-item" index="/">
               <el-icon><Star /></el-icon>
                MUNIKA
            </el-menu-item>
        </el-menu>
        <template #footer>
             <div class="title-holder" style="border-radius: 10px;">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/Kamun2025Logo.png"
                            alt="kamun Logo" height="10%" width="10%" ></span>
                    <span class="title-text">KAMUN 2025</span>
                </div>
                </div>
        </template>
    </el-drawer>
</template>
<style>
@import url("~/assets/css/kamun.css");
@import url('~/assets/css/main.css');
</style>