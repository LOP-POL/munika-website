<template>
    <section ref="rootRef" class="hero">

        <!-- Swaying trees: same artwork and sway as before, now on every screen size -->
        <svg class="hero-trees" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true"
            focusable="false">
            <g v-for="(layer, li) in layers" :key="layer.name" :class="['trees-layer', layer.name]">
                <g v-for="(t, i) in layer.trees" :key="li + '-' + i" :transform="treeTransform(t)" :opacity="t.o">
                    <g class="tree-fx">
                        <rect class="trunk" x="152.293" y="400.621" width="71" height="177" rx="9" />
                        <g class="foliage" :style="{ '--d': t.d + 's', '--t': t.t + 's' }">
                            <path
                                d="M180.165 150.513C183.517 145.354 191.069 145.354 194.421 150.513L372.699 424.991C376.372 430.646 372.314 438.121 365.571 438.121H9.01474C2.27189 438.121 -1.78607 430.646 1.88681 424.991L180.165 150.513Z" />
                            <path
                                d="M180.243 83.9821C183.612 78.9803 190.974 78.9803 194.343 83.9821L328.983 283.872C332.786 289.518 328.741 297.121 321.934 297.121H52.6524C45.8452 297.121 41.7997 289.518 45.6026 283.872L180.243 83.9821Z" />
                            <path
                                d="M180.4 4.02606C183.793 -0.674941 190.793 -0.674939 194.186 4.02606L284.845 129.646C288.902 135.268 284.885 143.121 277.952 143.121H96.6339C89.7013 143.121 85.6843 135.268 89.7413 129.646L180.4 4.02606Z" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>

        <div class="hero-inner">

            <!-- Logo: click it to send a gust of wind through the trees -->
            <button class="hero-logo" type="button" aria-label="MUNIKA logo - click to make the trees sway"
                @click="gust">
                <span class="hero-halo" aria-hidden="true"></span>
                <img class="hero-logo-img" src="/img-logos/MunikaLogo.jpg" alt="MUNIKA" width="112" height="112">
            </button>


            <h1 class="hero-title" aria-label="Model United Nations Initiative Karlsruhe">
                <span v-for="(line, li) in titleLines" :key="li" class="hero-line" aria-hidden="true">
                    <span v-for="w in line" :key="w" class="hero-word-mask">
                        <span class="hero-word" :class="{ 'is-accent': w === 'Karlsruhe' }">{{ w }}</span>
                    </span>
                </span>
            </h1>

            <p class="hero-sub">
                Shaping future diplomats through debate, diplomacy, and global awareness.
            </p>

            <div class="hero-cta">
                <NuxtLink to="/join" class="hero-btn hero-btn--join">
                    Join Us
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </NuxtLink>
                <NuxtLink to="/KAMUN" class="hero-btn hero-btn--kamun">
                    Go to KAMUN
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </NuxtLink>
                <NuxtLink to="/news" class="hero-btn hero-btn--news">
                    Latest News
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const rootRef = ref<HTMLElement | null>(null)

const titleLines = [
    ['Model', 'United', 'Nations', 'Initiative', 'Karlsruhe'],
]

/* ---------- Trees ----------
   Each tree is drawn in its own 375 x 578 box and then positioned/scaled inside a 1440 x 400 scene.
   Two layers (back = fainter, front = stronger) give depth. Values are fixed, so SSR and client match. */
interface Tree {
    x: number
    s: number
    o: number
    d: number // animation delay (negative, so trees are out of sync from the first frame)
    t: number // sway duration
}

const TREE_W = 375
const TREE_H = 578
const BASE = 400

const makeTrees = (xs: number[], ss: number[], opacity: number, seed: number): Tree[] =>
    xs.map((x, i) => {
        const s = ss[i % ss.length]
        return {
            x: x - (TREE_W * s) / 2,
            s,
            o: opacity,
            d: -((i * seed) % 7) * 0.7,
            t: 4.2 + ((i * seed) % 5) * 0.5,
        }
    })

const layers = [
    {
        name: 'layer-back',
        trees: makeTrees([40, 260, 480, 700, 920, 1140, 1360], [0.5, 0.42, 0.55, 0.46, 0.52, 0.44, 0.5], 0.16, 3),
    },
    {
        name: 'layer-front',
        trees: makeTrees([-10, 170, 380, 610, 830, 1050, 1250, 1430], [0.6, 0.44, 0.56, 0.4, 0.62, 0.46, 0.58, 0.5], 0.3, 5),
    },
]

const treeTransform = (t: Tree) => `translate(${t.x} ${BASE - TREE_H * t.s}) scale(${t.s})`

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* A gust: every tree rocks one way, then the other, rippling across the scene */
const gust = () => {
    if (prefersReducedMotion() || !rootRef.value) return
    gsap.to(rootRef.value.querySelectorAll('.tree-fx'), {
        keyframes: { rotation: [0, 4, -3, 2, -1, 0], easeEach: 'sine.inOut' },
        transformOrigin: '50% 100%',
        duration: 1.3,
        stagger: { each: 0.05, from: 'start' },
        overwrite: 'auto',
    })
    gsap.fromTo(
        rootRef.value.querySelector('.hero-logo-img'),
        { rotate: 0 },
        { rotate: 360, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'transform' }
    )
}

let mm: gsap.MatchMedia | null = null

onMounted(() => {
    if (!rootRef.value) return
    gsap.registerPlugin(ScrollTrigger)

    // Everything here only runs when the visitor has NOT asked for reduced motion
    mm = gsap.matchMedia(rootRef.value)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // trees grow up from the ground, from the middle outwards
        tl.from('.tree-fx', { y: 120, opacity: 0, duration: 1, stagger: { each: 0.04, from: 'center' } }, 0)
            .from('.hero-logo-img', { scale: 0.5, opacity: 0, rotate: -12, duration: 0.9, ease: 'back.out(1.7)' }, 0.1)
            .from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.5 }, '-=0.5')
            .from('.hero-word', { yPercent: 115, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.3')
            .fromTo(
                '.hero-word.is-accent',
                { backgroundSize: '0% 100%' },
                { backgroundSize: '100% 100%', duration: 0.8, ease: 'power2.out' },
                '-=0.2'
            )
            .from('.hero-sub', { y: 16, opacity: 0, duration: 0.6 }, '-=0.5')
            .from('.hero-cta > a', { y: 22, opacity: 0, duration: 0.55, stagger: 0.09 }, '-=0.4')

        // soft pulse ring around the logo
        // gsap.fromTo(
        //     '.hero-halo',
        //     { scale: 1, opacity: 0.55 },
        //     { scale: 1.7, opacity: 0, duration: 2.4, repeat: -1, ease: 'sine.out' }
        // )

        // depth: the two tree layers drift down at different speeds while scrolling away
        const st = { trigger: rootRef.value, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.layer-back', { y: 30, ease: 'none', scrollTrigger: st })
        gsap.to('.layer-front', { y: 60, ease: 'none', scrollTrigger: st })
    })
})

onUnmounted(() => {
    mm?.revert()
})
</script>

<style scoped>
/*
  Notes on main.css (global):
  - `* { transition: 0.5s ease }` would make GSAP tweens lag, so animated elements set `transition: none`
    and buttons only transition colours/shadow (never transform/opacity).
  - `.btn-primary`, `.hero-content`, `.hero-actions`, `.flex`, `#svg-trees` etc. are NOT used here on purpose:
    this hero has its own class names so global rules (and the old `#svg-trees` mobile override) can't interfere.
  - `body p { font-size: 12px }` (<=1000px) is overridden for the hero text below.
*/

.hero {
    --ink: #111827;
    position: relative;
    isolation: isolate;
    display: grid;
    place-items: center;
    width: 100%;
    min-height: max(520px, calc(80vh - var(--nav-h, 64px) - 40px));
    max-height: 100vh;
    overflow: hidden;
    border-radius: 20px;
    padding: clamp(2.5rem, 6vw, 4rem) 1rem clamp(7.5rem, 17vw, 11rem);
    box-sizing: border-box;
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.6) 45%, rgba(74, 206, 247, 0.28) 100%);
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.6) 45%, color-mix(in srgb, var(--theme-color) 30%, white) 100%);
    box-shadow: 0 20px 50px -30px rgba(15, 23, 42, 0.35);
}

/* fine dot grid, faded towards the edges */
.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background: radial-gradient(rgba(15, 23, 42, 0.1) 1px, transparent 1.5px) 0 0 / 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
    mask-image: radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%);
}

/* soft glow behind the logo and title */
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background: radial-gradient(circle at 50% 28%, rgba(74, 206, 247, 0.35), transparent 60%);
    background: radial-gradient(circle at 50% 28%, color-mix(in srgb, var(--theme-color) 38%, transparent), transparent 60%);
}

/* ---------- Trees ---------- */
.hero-trees {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    height: clamp(150px, 30vw, 360px);
    pointer-events: none;
}

.hero-trees * {
    fill: var(--theme-color);
    transition: none;
}

/* the foliage rocks around its base; every tree has its own delay/duration (set inline) */
.foliage {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: tree-sway var(--t, 4.6s) ease-in-out var(--d, 0s) infinite;
}

@keyframes tree-sway {

    0%,
    100% {
        rotate: 0deg;
    }

    25% {
        rotate: 1.8deg;
    }

    75% {
        rotate: -1.8deg;
    }
}

/* ---------- Content ---------- */
.hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(100%, 90rem);
    text-align: center;
}

.hero-inner>* {
    transition: none;
}

.hero-logo {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 1.25rem;
    border: 0;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: scale 0.3s ease; /* only `scale`: GSAP never touches this element */
}

@media (hover: hover) {
    .hero-logo:hover {
        scale: 1.06;
    }
}

.hero-logo:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 4px;
}

.hero-logo-img {
    display: block;
    width: clamp(5rem, 20vw, 7rem);
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #fff, 0 14px 34px -8px rgba(15, 23, 42, 0.35);
    transition: none;
}

/* ring that pulses around the logo; centred by `inset: 0` (no transforms needed) */
.hero-halo {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--theme-color);
    opacity: 0; /* only shown while GSAP pulses it */
    pointer-events: none;
    transition: none;
}

.hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1rem;
    padding: 0.35rem 0.9rem;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.75);
    color: #374151;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {

    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
    }

    50% {
        box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
    }
}

/* Title: two lines, words slide up out of a mask (italic serif is the club's look) */
.hero-title {
    margin: 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-style: italic;
    font-weight: 700;
    width: 100%;
    font-size: clamp(1.9rem, 6vw, 5rem);
    line-height: 1.12;
    letter-spacing: -0.01em;
    color: #1f2937;
    text-wrap: balance;
}

.hero-line {
    display: block;
}

.hero-word-mask {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    padding: 0 0.08em 0.14em; /* room for italic overhang and descenders */
    margin: 0 0.12em -0.14em;
}

.hero-word {
    display: inline-block;
    transition: none;
}

/* marker-style highlight under "Karlsruhe" (legible on light backgrounds, follows the theme colour) */
.hero-word.is-accent {
    background: linear-gradient(transparent 62%, var(--theme-color) 62%, var(--theme-color) 92%, transparent 92%) no-repeat left / 100% 100%;
}

.hero-inner .hero-sub {
    max-width: 36rem;
    margin: 1.1rem auto 1.75rem;
    color: #4b5563;
    font-size: clamp(1rem, 2.2vw, 1.2rem);
    line-height: 1.6;
}

/* ---------- Calls to action ---------- */
.hero-cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
}

.hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.40rem 1.25rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-btn svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: translate 0.25s ease;
}

.hero-btn:hover svg {
    translate: 4px 0;
}

.hero-btn:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
}

/* primary: Join Us */
.hero-btn--join {
    background: var(--ink);
    color: #fff;
    box-shadow: 0 10px 22px -12px rgba(17, 24, 39, 0.7);
}

.hero-btn--join:hover {
    background: #1f2937;
    box-shadow: 0 14px 26px -12px rgba(17, 24, 39, 0.8);
}

/* KAMUN: brand colour, dark text keeps contrast on blue and on yellow */
.hero-btn--kamun {
    background: var(--theme-color);
    color: #10222b;
    box-shadow: 0 10px 22px -12px rgba(0, 0, 0, 0.45);
}

.hero-btn--kamun:hover {
    box-shadow: 0 14px 26px -12px rgba(0, 0, 0, 0.55);
    filter: brightness(1.04);
}

/* secondary: News */
.hero-btn--news {
    border-color: rgba(17, 24, 39, 0.25);
    background: rgba(255, 255, 255, 0.5);
    color: var(--ink);
}

.hero-btn--news:hover {
    border-color: var(--ink);
    background: rgba(255, 255, 255, 0.9);
}

/* ---------- Small screens ---------- */
@media (max-width: 640px) {
    .hero {
        min-height: 0;
        border-radius: 16px;
    }

    .hero-cta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 22rem;
        gap: 0.6rem;
    }

    .hero-btn {
        padding: 0.45rem 0.35rem;
    }

    /* Join Us is the main action: full width on top */
    .hero-btn--join {
        grid-column: 1 / -1;
    }
}

@media (prefers-reduced-motion: reduce) {

    .foliage,
    .hero-dot {
        animation: none;
    }
}
</style>
