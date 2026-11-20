<template>
    <nav
        class="custom-nav-menu"
        :class="vertical ? 'is-vertical' : ''"
        aria-label="Main navigation"
    >
        <ul class="nav-list">
            <li
                v-for="route in routes"
                :key="route.path"
                class="nav-item"
                :class="{
                    'is-special': isSpecial(route),
                    'is-active': isActive(route),
                }"
            >
                <NuxtLink
                    :to="route.path ?? '/'"
                    class="nav-link"
                    :aria-current="isActive(route) ? 'page' : undefined"
                    @click="emit('navigate')"
                >
                    <component
                        :is="route.icon"
                        v-if="vertical && route.icon"
                        class="nav-icon"
                        aria-hidden="true"
                    />
                    <span class="nav-label">{{ route.page }}</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface NavRoute {
    page: string;
    path?: string;
    icon?: Component;
    special?: boolean;
}

const props = defineProps<{
    routes: NavRoute[];
    vertical?: boolean;
}>();

const emit = defineEmits<{ (e: "navigate"): void }>();

const route = useRoute();

// "/KAMUN", "/kamun" and "/kamun/" are all the same page
const normalise = (p: string) => {
    const x = p.toLowerCase().replace(/\/+$/, "");
    return x === "" ? "/" : x;
};

const matchesRoute = (current: string, target: string) =>
    target === "/"
        ? current === "/"
        : current === target || current.startsWith(`${target}/`);

const isActive = (r: NavRoute) => {
    const current = normalise(route.path);
    const target = normalise(r.path ?? "/");
    if (!matchesRoute(current, target)) return false;

    return !props.routes.some((candidate) => {
        const candidateTarget = normalise(candidate.path ?? "/");
        return candidateTarget.length > target.length &&
            matchesRoute(current, candidateTarget);
    });
};

// "special" links are the highlighted call-to-action pill (KAMUN by default)
const isSpecial = (r: NavRoute) =>
    r.special ?? (r.page === "KAMUN" || r.page === "MUNIKA");
</script>

<style scoped>
.custom-nav-menu {
    display: flex;
    align-items: center;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
}

/* main.css has `* { transition: .5s }`: li elements are animated by GSAP in the drawer, so no transition here */
.nav-item {
    margin: 0;
    transition: none;
    color: #1f2937;
}

.nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
    padding: 0.5rem 0.9rem;
    border-radius: 999px;
    color: #1f2937 !important;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition:
        color 0.25s ease,
        background-color 0.25s ease,
        box-shadow 0.25s ease;
}

/* animated underline: grows on hover, stays for the current page */
.nav-link::after {
    content: "";
    position: absolute;
    bottom: 0.9rem;
    top: 0.9rem;
    right: 0.3rem;
    height: 2px;
    border-radius: 2px;
    background: var(--theme-color);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s ease;
}

.nav-link:hover::after,
.is-active .nav-link::after {
    transform: scaleX(1);
}

.nav-link:hover {
    color: #1f2937 !important;
}

.nav-link:focus-visible {
    outline: 2px solid #111827;
    outline-offset: 2px;
}

.is-active .nav-link {
    color: #1f2937 !important;
    font-weight: 600;
    background-color: rgba(15, 23, 42, 0.05);
    background-color: color-mix(in srgb, var(--theme-color) 20%, transparent);
}

/* ---------- Highlighted link (KAMUN) ---------- */
.is-special .nav-link {
    background-color: var(--theme-color);
    color: #1f2937 !important;
    font-weight: 600;
    box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.45);
    margin-top: 0;
}

.is-special .nav-link::after {
    display: none;
}

.is-special .nav-link:hover {
    box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.55);
    filter: brightness(1.04);
}

.is-special.is-active .nav-link {
    box-shadow:
        0 0 0 2px #fff,
        0 0 0 4px var(--theme-color);
}

/* ---------- Vertical (mobile drawer) ---------- */
.is-vertical {
    display: block;
}

.is-vertical > .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
}

.is-vertical .nav-link {
    width: 100%;
    box-sizing: border-box;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    font-size: 1.05rem;
}

/* vertical bar replaces the underline */
.is-vertical .nav-link::after {
    left: 0;
    right: auto;
    top: 22%;
    bottom: 22%;
    width: 4px;
    height: auto;
    transform: scaleY(0);
    transform-origin: center;
}

.is-vertical .nav-link:hover::after,
.is-vertical .is-active .nav-link::after {
    transform: scaleY(1);
}

.nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex: none;
}

.is-vertical .is-special .nav-link {
    justify-content: flex-start;
}
</style>
