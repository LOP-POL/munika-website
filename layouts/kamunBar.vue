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
})

onUnmounted(() => {
    window.removeEventListener('resize', updatePageWidth)
})

console.log(pageWidth.value)
</script>

<template>
    <link rel="stylesheet" href="~/assets/css/main.css">
    <el-container>
        <el-header class="main-page-header">

            <div class="title-holder">
                <div class="title-logo-and-text">
                    <span @click="onBack" class="logo-holder"><img class="main-logo" src="/img-logos/MunikaLogo.jpg"
                            alt="munikaLogo" height="10%" width="10%"></span>
                    <span class="title-text">MUNIKA.eV</span>
                </div>

                <span class="nav-menu">
                    <el-button class="menu-toggle" @click="menuVisible = true" v-if="pageWidth < 900" :icon="Menu"
                        square plain />
                    <el-menu mode="horizontal" :router="true" class="main-nav main-nav-show" active-text-color="#ffd04b"
                        :style="{ width: pageWidth < 900 ? '100%' : 'auto', display: pageWidth < 900 ? 'none' : 'flex' }">
                        <el-menu-item index="/">Home</el-menu-item>
                        <el-menu-item index="/team">Team</el-menu-item>
                        <el-menu-item index="/news">News</el-menu-item>
                        <el-menu-item index="/KAMUN">KAMUN</el-menu-item>
                        <el-menu-item index="/Impressum">Impressum</el-menu-item>
                        <el-menu-item index="/join">Join us</el-menu-item>
                    </el-menu>

                </span>
            </div>

        </el-header>


        <el-main class="main-content">
            <slot />
        </el-main>

        <el-footer class="main-page-footer">
            <div></div>
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
@import url("~/assets/css/main.css")
</style>