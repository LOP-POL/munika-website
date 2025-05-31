<script lang="ts" setup>

import {
    Menu
} from '@element-plus/icons-vue'



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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = '1'
            }
           
        })
    }, { threshold: 0.75 })

    document.querySelectorAll('.main-section').forEach(node => {
        (node as HTMLElement).style.opacity = '0'
        observer.observe(node)
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', updatePageWidth)
})


</script>

<template>
    <link rel="stylesheet" href="~/assets/css/kamun.css">
    <el-container>
        <el-header class="main-page-header">

            <div class="title-holder">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/Kamun2025Logo.png"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">KAMUN 2025</span>
                </div>

                <span class="nav-menu">
                    <el-button class="menu-toggle" @click="menuVisible = true" v-if="pageWidth < 900" :icon="Menu"
                        square plain />
                    <el-menu mode="horizontal" :router="true" class="main-nav main-nav-show" active-text-color="#ffd04b"
                        :style="{ width: pageWidth < 900 ? '100%' : 'auto', display: pageWidth < 900 ? 'none' : 'flex' }">
                        <el-menu-item index="/KAMUN">Home</el-menu-item>
                        <el-menu-item index="/KAMUN/Team">Team</el-menu-item>
                        <el-menu-item index="/KAMUN/committees">Commitees</el-menu-item>
                        <el-menu-item index="/">MUNIKA</el-menu-item>
                        <el-menu-item index="/KAMUN/sponsor">Sponsor Us</el-menu-item>

                      
                    </el-menu>

                </span>
            </div>
          
        </el-header>


        <el-main class="main-content">
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
                        <a href="https://instagram.com/your_instagram" target="_blank" rel="noopener"
                            aria-label="Instagram">
                            <i class="el-icon el-icon-message"></i> Instagram
                        </a>
                    </li>
                    <li>
                        <a href="mailto:your_email@example.com" aria-label="Email">
                            <i class="el-icon el-icon-message"></i> Email
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/your_linkedin" target="_blank" rel="noopener"
                            aria-label="LinkedIn">
                            <i class="el-icon el-icon-link"></i> LinkedIn
                        </a>
                    </li>
                </ul>
            </div>

        </el-footer>
    </el-container>
    <el-drawer v-model="menuVisible" direction="ttb" size="20%" :with-header="false" class="mobile-nav-drawer">
        <!-- Drawer content goes here -->
        <el-menu mode="horizontal" :router="true" class="main-nav" active-text-color="#ffd04b">
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item index="/team">Team</el-menu-item>
            <el-menu-item index="/news">News</el-menu-item>
            <el-menu-item index="/KAMUN">KAMUN</el-menu-item>
            <el-menu-item index="/Impressum">Impressum</el-menu-item>
            <el-menu-item index="/join">Join us</el-menu-item>
        </el-menu>
    </el-drawer>
</template>
<style>
@import url("~/assets/css/kamun.css");
@import url('~/assets/css/main.css');
</style>