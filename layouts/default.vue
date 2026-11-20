<script lang="ts" setup>
import type { Component } from 'vue'
import { gsap } from 'gsap'
import { House, Notification, Document, User, Star } from '@element-plus/icons-vue'

useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/jpeg',
            href: '/img-logos/MunikaLogo.jpg',
        },
    ],
})

const mainCon = ref<HTMLElement>()
const router = useRouter()
const route = useRoute()

const menuVisible = ref(false)
const scrolled = ref(false)

interface NavRoute {
    page: string
    path: string
    icon: Component
}

const routes: NavRoute[] = [
    { page: 'Home', path: '/', icon: House },
    { page: 'News', path: '/news', icon: Notification },
    { page: 'Impressum', path: '/impressum', icon: Document },
    { page: 'Join Us', path: '/join', icon: User },
    { page: 'KAMUN', path: '/KAMUN', icon: Star },
]

// stronger bar background + shadow once the page has been scrolled a little
const onScroll = () => {
    scrolled.value = window.scrollY > 8
}

// stagger the drawer links in (skipped for reduced motion)
const animateDrawer = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    nextTick(() => {
        gsap.from('.mobile-nav-drawer .nav-item, .mobile-nav-drawer .drawer-foot', {
            x: 28,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            delay: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
        })
    })
}

// close the drawer whenever the route changes (also covers back/forward buttons)
watch(() => route.path, () => {
    menuVisible.value = false
})

onMounted(() => {

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    document.querySelectorAll('.main-section').forEach(node => {
        (node as HTMLElement).style.opacity = '0'
    })

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
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>

    <el-container class="super-container">
        <el-header class="main-page-header">

            <!-- Fixed, translucent navigation bar -->
            <header class="site-nav" :class="{ 'is-scrolled': scrolled }">
                <div class="site-nav-inner">
                    <NuxtLink to="/" class="brand" aria-label="MUNIKA home">
                        <img class="brand-logo" src="/img-logos/MunikaLogo.jpg" alt="" width="50" height="50">
                        <span class="brand-text">MUNIKA <small>e.V.</small></span>
                    </NuxtLink>

                    <!-- desktop menu (hidden below 1000px by CSS, so there is no flash on first load) -->
                    <CustomNavMenu class="nav-desktop" :routes="routes"/>

                    <!-- burger (shown below 1000px) -->
                    <button class="burger" type="button" aria-label="Open menu" aria-haspopup="dialog"
                        :aria-expanded="menuVisible" aria-controls="mobile-nav" @click="menuVisible = true">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </header>

        </el-header>


        <el-main class="main-content" ref="mainCon">
                <slot />
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

    <el-drawer v-model="menuVisible" direction="rtl" size="85%" :with-header="false" class="mobile-nav-drawer"
        modal-class="mobile-nav-overlay" @open="animateDrawer">
        <div id="mobile-nav" class="drawer-inner">
            <div class="drawer-head">
                <NuxtLink to="/" class="brand" aria-label="MUNIKA home">
                    <img class="brand-logo" src="/img-logos/MunikaLogo.jpg" alt="" width="40" height="40">
                    <span class="brand-text">MUNIKA <small>e.V.</small></span>
                </NuxtLink>
                <button class="drawer-close" type="button" aria-label="Close menu" @click="menuVisible = false">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>
            </div>

            <CustomNavMenu :routes="routes" vertical @navigate="menuVisible = false" />

            <div class="drawer-foot">
                <a href="mailto:vorstand@munika.org">vorstand@munika.org</a>
                <a href="https://www.instagram.com/munika_ev_" target="_blank" rel="noopener">Instagram &middot; munika_ev</a>
            </div>
        </div>
    </el-drawer>
</template>

<style>
@import url("~/assets/css/main.css")
/* This one thing is helping to hold up the whole color switching thing , Do not remove this or it will not work properly */
</style>

<!-- Drawer lives outside the layout DOM (teleported), so its shell is styled globally -->
<style>
.el-drawer.mobile-nav-drawer {
    --el-drawer-bg-color: transparent;
    max-width: 340px;
    background: rgba(255, 255, 255, 0.74) !important;
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    backdrop-filter: blur(20px) saturate(1.4);
    box-shadow: -20px 0 50px -20px rgba(15, 23, 42, 0.4);
}

.mobile-nav-drawer .el-drawer__body {
    padding: 0;
}

.mobile-nav-overlay {
    background-color: rgba(15, 23, 42, 0.38) !important;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
}
</style>

<style scoped>
.super-container {
    --nav-h: 64px; /* hero and other sections can use var(--nav-h) */
}

/* the el-header is only a spacer that reserves room for the fixed bar */
.main-page-header {
    height: var(--nav-h);
    padding: 0;
}

/* ---------- Translucent bar ---------- */
.site-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: var(--nav-h);
    background: rgba(255, 255, 255, 0.62);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    backdrop-filter: blur(16px) saturate(1.4);
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.site-nav.is-scrolled {
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 8px 24px -14px rgba(15, 23, 42, 0.35);
}

.site-nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(0.75rem, 3vw, 2rem);
    box-sizing: border-box;
}

/* ---------- Brand ---------- */
.brand {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    color: #111827;
    text-decoration: none;
}

.brand-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 0 2px #fff, 0 3px 10px rgba(15, 23, 42, 0.25);
}

.brand-text {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #111827;
}

.brand-text small {
    margin-left: 0.15em;
    font-size: 0.8em;
    font-weight: 500;
    color: #6b7280;
}

/* ---------- Burger ---------- */
.burger {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.06);
    cursor: pointer;
    transition: background-color 0.25s ease;
}

.burger:hover {
    background: rgba(15, 23, 42, 0.12);
}

.burger:focus-visible,
.drawer-close:focus-visible {
    outline: 2px solid #111827;
    outline-offset: 2px;
}

.burger span {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: #111827;
}

.burger span:nth-child(2) {
    width: 14px;
}

@media (max-width: 999.98px) {
    /* one class more specific than CustomNavMenu's own `display: flex` */
    .site-nav .nav-desktop {
        display: none;
    }

    .burger {
        display: inline-flex;
    }
}

/* ---------- Drawer content ---------- */
.drawer-inner {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    min-height: 100%;
    padding: 1rem 1.1rem 1.5rem;
    box-sizing: border-box;
}

.drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(15, 23, 42, 0.1);
}

.drawer-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.06);
    cursor: pointer;
    transition: background-color 0.25s ease;
}

.drawer-close:hover {
    background: rgba(15, 23, 42, 0.12);
}

.drawer-close svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #111827;
    stroke-width: 2;
    stroke-linecap: round;
}

.drawer-foot {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(15, 23, 42, 0.1);
    font-size: 0.9rem;
    transition: none; /* animated by GSAP; main.css has `* { transition: .5s }` */
}

.drawer-foot a {
    color: #4b5563;
    text-decoration: none;
}

.drawer-foot a:hover {
    color: #111827;
}
</style>
