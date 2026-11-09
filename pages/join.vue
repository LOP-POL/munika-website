<template>
    <head-and-c>
        <template #title>
            Contact us
        </template>
        <p>
            Join the newcomers <a href="https://chat.whatsapp.com/DosakRyMoIeDVOYueAcy21?mode=gi_t">WhatsApp Group</a>
            to
            directly chat and get acquainted with us.
        </p>

        <p>
            Send us an email on <a href="mailto:vorstand@munika.org">vorstand@munika.org</a>
        </p>

    </head-and-c>

    <!-- Streak zone: the SVG streak is drawn behind the three feature sections and grows on scroll -->
    <div ref="zoneRef" class="streak-zone">
        <svg ref="svgRef" class="streak" aria-hidden="true" preserveAspectRatio="none">
            <path ref="glowRef" class="streak-glow" fill="none" />
            <path ref="mainRef" class="streak-main" fill="none" />
        </svg>

        <JoinSection image-a="/join/debate-1.jpeg" image-b="/join/debate-2.jpeg" graphic="/join/debate.svg"
            alt-a="Members during a weekly debate" alt-b="Debate discussion round">
            <template #title>
                Weekly Debates
            </template>
            <p>
                Explore topics from global issues to light-hearted dilemmas in a relaxed, supportive setting. Sharpen your
                public
                speaking skills
                while sharing ideas and enjoying engaging discussions. We hope to see you on <NuxtLink to="news">
                    Tuesdays
                    at 7 pm !
                </NuxtLink>
            </p>
        </JoinSection>

        <JoinSection reverse image-a="/join/conference-1.jpeg" image-b="/join/conference-2.jpeg"
            graphic="/join/conference.svg" alt-a="Delegates at a MUN conference" alt-b="Our team at a conference visit">
            <template #title>
                Attending Conferences
            </template>
            <p>
                Attend prestigious MUN conferences in Germany and worldwide. Engage with changemakers, enjoy
                unforgettable
                experiences and flex your diplomacy.
            </p>
        </JoinSection>

        <JoinSection image-a="/join/kamun-1.jpeg" image-b="/join/kamun-2.jpeg" graphic="/join/kamun.svg"
            alt-a="The KAMUN organizing team" alt-b="KAMUN conference in session">
            <template #title>
                Organizing <NuxtLink to="/kamun">KAMUN</NuxtLink>
            </template>
            <p>
                Step into leadership, gain invaluable skills, form lasting friendships, and discover more about
                yourself -
                all
                while having a great
                time with an incredible team!
            </p>
        </JoinSection>
    </div>

    <head-and-c>
        <template #title>
            Download our <a :href="flyer" ref="flyerRef">flyer </a> for reference and share with your friends.
        </template>

    </head-and-c>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const flyer = '/flyer.jpeg';
const flyerRef = ref(null);

const zoneRef = ref(null);
const svgRef = ref(null);
const glowRef = ref(null);
const mainRef = ref(null);

let ctx = null;
let resizeObserver = null;
const state = { p: 0 }; // scroll progress 0 -> 1 driven by ScrollTrigger
let lenMain = 0;
let lenGlow = 0;

// Build a winding path that snakes left/right through the middle of each section
function buildPath() {
    const zone = zoneRef.value;
    if (!zone || !svgRef.value) return;

    const W = zone.clientWidth;
    const H = zone.clientHeight;
    const zoneTop = zone.getBoundingClientRect().top;
    const sections = zone.querySelectorAll('[data-streak-section]');
    const narrow = W < 900;

    // x positions alternate sides; on narrow screens keep it closer to the edges
    const xs = narrow ? [0.1, 0.9] : [0.14, 0.86];

    const pts = [{ x: W * 0.5, y: 0 }];
    sections.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        pts.push({ x: W * xs[i % 2], y: r.top - zoneTop + r.height / 2 });
    });
    pts.push({ x: W * 0.5, y: H });

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const my = (a.y + b.y) / 2;
        d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
    }

    const svg = svgRef.value;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    const sw = Math.max(36, Math.min(110, W * 0.09));
    [glowRef.value, mainRef.value].forEach((p) => p.setAttribute('d', d));
    mainRef.value.style.strokeWidth = sw;
    glowRef.value.style.strokeWidth = sw * 1.7;

    lenMain = mainRef.value.getTotalLength();
    lenGlow = glowRef.value.getTotalLength();
    mainRef.value.style.strokeDasharray = lenMain;
    glowRef.value.style.strokeDasharray = lenGlow;
    applyProgress();
}

function applyProgress() {
    if (!mainRef.value) return;
    mainRef.value.style.strokeDashoffset = lenMain * (1 - state.p);
    // soft glow trails slightly behind the main streak
    glowRef.value.style.strokeDashoffset = lenGlow * (1 - state.p * 0.93);
}

onMounted(() => {
    if (flyerRef.value) {
        flyerRef.value.setAttribute('download', 'flyer.jpeg');
    }

    gsap.registerPlugin(ScrollTrigger);
    buildPath();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        state.p = 1;
        applyProgress();
    } else {
        ctx = gsap.context(() => {
            gsap.to(state, {
                p: 1,
                ease: 'none',
                onUpdate: applyProgress,
                scrollTrigger: {
                    trigger: zoneRef.value,
                    start: 'top 65%',
                    end: 'bottom 70%',
                    scrub: 0.8, // smooth catch-up
                },
            });
        }, zoneRef.value);
    }

    // Images load lazily and change heights -> rebuild path and refresh triggers
    resizeObserver = new ResizeObserver(() => {
        buildPath();
        ScrollTrigger.refresh();
    });
    resizeObserver.observe(zoneRef.value);
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    ctx?.revert();
});
</script>

<style scoped>
.streak-zone {
    position: relative;
    width: 100%;
    overflow: hidden;
    /* hide the streak's overflow so it never causes horizontal scroll */
}

.streak {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    pointer-events: none;
}

.streak-main,
.streak-glow {
    stroke: var(--theme-color);
    stroke-linecap: round;
    stroke-linejoin: round;
}

.streak-main {
    opacity: 0.9;
}

.streak-glow {
    opacity: 0.18;
}
</style>
