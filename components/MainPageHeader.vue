<template>
    <section
        class="container-home container-home-main"
        ref="headerRef"
        style="margin: 0; width: 100%"
    >
        <div
            class="left-side layered-content"
            :class="{ 'lighten-back': teamPictureBg }"
        >
            <!-- Hero Section -->
            <section class="hero-section">
                <!-- MUN-flavoured "placards" that float around the content (mobile / tablet only) -->
                <div class="hero-chips" aria-hidden="true">
                    <div
                        v-for="chip in chips"
                        :key="chip.text"
                        class="hero-chip"
                        :style="chip.pos"
                    >
                        <span
                            class="hero-chip-inner"
                            :data-speed="chip.speed"
                            :style="{ transform: `rotate(${chip.tilt})` }"
                        >
                            {{ chip.text }}
                        </span>
                    </div>
                </div>

                <div class="max-w-4xl hero-content">
                    <div class="hero-logo">
                        <!-- inner box is exactly as big as the logo, so the globe is centred on the logo itself -->
                        <div class="hero-logo-inner">
                            <!-- Rotating wireframe globe + pulse ring behind the logo -->
                            <svg
                                class="hero-globe"
                                viewBox="0 0 200 200"
                                aria-hidden="true"
                                fill="none"
                            >
                                <circle
                                    class="globe-pulse"
                                    cx="100"
                                    cy="100"
                                    r="92"
                                />
                                <circle
                                    class="globe-outline"
                                    cx="100"
                                    cy="100"
                                    r="90"
                                />
                                <ellipse
                                    v-for="n in 4"
                                    :key="n"
                                    class="globe-meridian"
                                    :data-offset="(n - 1) * 45"
                                    cx="100"
                                    cy="100"
                                    rx="90"
                                    ry="90"
                                />
                                <ellipse
                                    class="globe-lat"
                                    cx="100"
                                    cy="100"
                                    rx="90"
                                    ry="28"
                                />
                                <line
                                    class="globe-lat"
                                    x1="10"
                                    y1="100"
                                    x2="190"
                                    y2="100"
                                />
                            </svg>
                            <img
                                src="/img-logos/MunikaLogo.jpg"
                                alt="MUNIKA"
                                @click="triggerGust"
                            />
                        </div>
                    </div>

                    <h1
                        :class="teamPictureBg ? 'color-white' : ''"
                        aria-label="Model United Nations Initiative Karlsruhe"
                    >
                        <span
                            v-for="w in titleWords"
                            :key="w"
                            class="hero-word-mask"
                            aria-hidden="true"
                        >
                            <span class="hero-word">{{ w }}</span>
                        </span>
                    </h1>
                    <span class="hero-rule" aria-hidden="true"></span>

                    <div class="flex hero-actions">
                        <NuxtLink to="/KAMUN" class="btn-kamun"
                            >Go to KAMUN</NuxtLink
                        >
                        <NuxtLink to="/join" class="btn-join">Join Us</NuxtLink>
                        <NuxtLink to="/news" class="btn-news"
                            >Latest News</NuxtLink
                        >
                    </div>

                    <!-- Quick facts -->
                    <div class="hero-info">
                        <NuxtLink to="/join">
                            <div class="hero-info-card">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                    />
                                </svg>
                                <strong>Weekly Debates</strong>
                                <small>Tuesdays, 7 pm</small>
                            </div>
                        </NuxtLink>
                        <NuxtLink to="/join">
                            <div class="hero-info-card">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20" />
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                                    />
                                </svg>
                                <strong>Conferences</strong>
                                <small>Germany &amp; worldwide</small>
                            </div>
                        </NuxtLink>
                        <NuxtLink to="/KAMUN">
                            <div class="hero-info-card">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 22h18" />
                                    <path d="M6 18v-7" />
                                    <path d="M10 18v-7" />
                                    <path d="M14 18v-7" />
                                    <path d="M18 18v-7" />
                                    <path d="m12 2 9 5H3z" />
                                </svg>
                                <strong>KAMUN</strong>
                                <small>Run by our team</small>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <!-- Scroll indicator -->
                <div class="scroll-indicator">
                    <a href="#content" class="bounce">
                        <el-icon>
                            <ArrowDownBold />
                        </el-icon>
                    </a>
                </div>
            </section>
        </div>

        <div
            class="right-side layered-content"
            :class="teamPictureBg ? pictureToShow : ''"
        >
            <div
                v-if="isMobile || teamPictureBg"
                class="svg-container waves-svg-con"
            >
                <svg
                    class="waves-svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                    ></path>
                </svg>
            </div>
            <div v-else class="svg-container">
                <svg
                    id="svg-trees"
                    viewBox="0 0 375 578"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ 'is-animated': animate, 'is-gusting': gusting }"
                >
                    <g
                        class="tree-svg"
                        v-for="x in [
                            '50vw',
                            '35vw',
                            '0',
                            '20vw',
                            '-20vw',
                            '-30vw',
                            '-40vw',
                            '-60vw',
                            '70vw',
                            '-70vw',
                        ]"
                        :key="x"
                        :style="{ transform: `translate(${x},0)` }"
                    >
                        <path
                            id="Polygon 3"
                            class="tree-part polygon3"
                            d="M180.165 150.513C183.517 145.354 191.069 145.354 194.421 150.513L372.699 424.991C376.372 430.646 372.314 438.121 365.571 438.121H9.01474C2.27189 438.121 -1.78607 430.646 1.88681 424.991L180.165 150.513Z"
                        />
                        <path
                            id="Polygon 2"
                            class="tree-part polygon2"
                            d="M180.243 83.9821C183.612 78.9803 190.974 78.9803 194.343 83.9821L328.983 283.872C332.786 289.518 328.741 297.121 321.934 297.121H52.6524C45.8452 297.121 41.7997 289.518 45.6026 283.872L180.243 83.9821Z"
                        />
                        <path
                            id="Polygon 1"
                            class="tree-part polygon1"
                            d="M180.4 4.02606C183.793 -0.674941 190.793 -0.674939 194.186 4.02606L284.845 129.646C288.902 135.268 284.885 143.121 277.952 143.121H96.6339C89.7013 143.121 85.6843 135.268 89.7413 129.646L180.4 4.02606Z"
                        />
                        <rect
                            id="Rectangle 1"
                            class="rectangle1"
                            x="152.293"
                            y="400.621"
                            width="71"
                            height="177"
                            rx="9"
                        />
                    </g>
                </svg>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ArrowDownBold } from "@element-plus/icons-vue";
import { useMediaQuery } from "@vueuse/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const headerRef = ref<HTMLElement | null>(null);

const animate = ref(false);
const gusting = ref(false);
const isMobile = useMediaQuery("(max-width: 1024px)");

const teamPictureBg = ref(false);
const showTeamPicture = ref(true); // flips every time the picture is switched on, so it alternates

const titleWords = ["Model", "United", "Nations", "Initiative", "Karlsruhe"];

// Classic Model UN lingo, floated around the hero on small screens
const chips = [
    {
        text: "Point of Information",
        pos: { top: "1.1rem", left: "4%" },
        speed: 0.6,
        tilt: "-4deg",
    },
    {
        text: "Delegate",
        pos: { top: "2.9rem", right: "5%" },
        speed: 1,
        tilt: "5deg",
    },
    {
        text: "Motion to Caucus",
        pos: { top: "4.7rem", left: "12%" },
        speed: 0.8,
        tilt: "3deg",
    },
    {
        text: "Draft Resolution",
        pos: { bottom: "4.6rem", right: "6%" },
        speed: 0.7,
        tilt: "-5deg",
    },
    {
        text: "Yield the Floor",
        pos: { bottom: "6.4rem", left: "5%" },
        speed: 1,
        tilt: "4deg",
    },
    {
        text: "Diplomacy",
        pos: { bottom: "1.6rem", left: "34%" },
        speed: 0.5,
        tilt: "-3deg",
    },
];

const pictureToShow = computed(() =>
    showTeamPicture.value ? "teamPictureBg" : "schlossPictureBg",
);

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const triggerGust = () => {
    gusting.value = false;
    teamPictureBg.value = !teamPictureBg.value;
    if (teamPictureBg.value) showTeamPicture.value = !showTeamPicture.value;

    // little spin on the logo (skipped for reduced motion)
    if (!prefersReducedMotion() && headerRef.value) {
        const img = headerRef.value.querySelector(".hero-logo img");
        if (img)
            gsap.fromTo(
                img,
                { rotate: 0 },
                {
                    rotate: 360,
                    duration: 0.8,
                    ease: "back.out(1.4)",
                    clearProps: "transform",
                },
            );
    }

    requestAnimationFrame(() => {
        gusting.value = true;
        setTimeout(() => {
            gusting.value = false;
        }, 900);
    });
};

let mm: gsap.MatchMedia | null = null;

onMounted(() => {
    animate.value = true;
    gsap.registerPlugin(ScrollTrigger);
    if (!headerRef.value) return;

    // Everything below only runs when the visitor has NOT asked for reduced motion.
    // matchMedia also cleans up / reverts automatically if the preference changes.
    mm = gsap.matchMedia(headerRef.value);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ---------- Entrance sequence ----------
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-globe", {
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.4)",
        })
            .from(
                ".hero-logo img",
                {
                    scale: 0.4,
                    rotate: -15,
                    opacity: 0,
                    duration: 0.9,
                    ease: "back.out(1.8)",
                },
                "<0.1",
            )
            .from(
                ".hero-word",
                { yPercent: 115, opacity: 0, duration: 0.7, stagger: 0.08 },
                "-=0.5",
            )
            .from(
                ".hero-rule",
                { scaleX: 0, duration: 0.6, transformOrigin: "center" },
                "-=0.3",
            )
            .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.3")
            .from(
                ".hero-actions > a",
                { y: 26, opacity: 0, duration: 0.6, stagger: 0.1 },
                "-=0.4",
            )
            .from(
                ".hero-info-card",
                { y: 34, opacity: 0, duration: 0.7, stagger: 0.12 },
                "-=0.3",
            )
            .from(
                ".hero-chip-inner",
                {
                    scale: 0,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "back.out(2.2)",
                },
                "-=1",
            )
            .from(
                ".scroll-indicator",
                { opacity: 0, y: -10, duration: 0.6 },
                "-=0.3",
            );

        // ---------- Globe: real rotation by squeezing meridians + a soft pulse ----------
        const meridians =
            gsap.utils.toArray<SVGEllipseElement>(".globe-meridian");
        const spin = { angle: 0 };
        gsap.to(spin, {
            angle: 180,
            duration: 14,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
                meridians.forEach((m) => {
                    const offset = Number(m.dataset.offset || 0);
                    const rx =
                        Math.abs(
                            Math.cos(((spin.angle + offset) * Math.PI) / 180),
                        ) * 90;
                    m.setAttribute("rx", String(rx));
                });
            },
        });
        gsap.fromTo(
            ".globe-pulse",
            { scale: 0.92, opacity: 0.5, transformOrigin: "50% 50%" },
            {
                scale: 1.12,
                opacity: 0,
                duration: 2.6,
                repeat: -1,
                ease: "sine.out",
            },
        );

        // ---------- Floating placards ----------
        gsap.utils.toArray<HTMLElement>(".hero-chip").forEach((el, i) => {
            gsap.to(el, {
                y: gsap.utils.random(-14, 14),
                x: gsap.utils.random(-8, 8),
                duration: gsap.utils.random(2.4, 4.2),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: i * 0.2,
            });
        });

        // ---------- Scroll-linked depth ----------
        const st = {
            trigger: headerRef.value,
            start: "top top",
            end: "bottom top",
            scrub: true,
        };
        gsap.to(".hero-content", {
            yPercent: -6,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: st,
        });
        gsap.utils.toArray<HTMLElement>(".hero-chip-inner").forEach((el) => {
            gsap.to(el, {
                y: -80 * Number(el.dataset.speed || 1),
                ease: "none",
                scrollTrigger: st,
            });
        });
    });
});

onUnmounted(() => {
    mm?.revert();
});
</script>

<style scoped>
/*
  Notes on main.css (global) that this component works with:
  - `* { transition: 0.5s ease }` would make every GSAP tween lag by half a second,
    so animated elements below get `transition: none` (see "GSAP vs global transition").
  - .container-home / .container-home-main / .layered-content force 82svh-100vh boxes;
    on small screens we let the content decide the height instead.
  - .left-side already has z-index:3 (sits above .right-side), so nothing extra is needed there.
  - .hero-logo img is already a circle (50%, aspect-ratio 1) - we keep that.
  - .waves-svg-con, .waves-svg, .svg-container, .btn-*, .flex, .hero-content, .hero-actions,
    .scroll-indicator are all styled globally and are not repeated here.
*/

.lighten-back {
    background-color: #2f4f3e88;
}

.teamPictureBg {
    background-image: url("/styleImgs/teamPictureBW.jpg");
}

.schlossPictureBg {
    background-image: url("/styleImgs/schloss.jpg");
}

.color-white {
    color: white;
}

/* ---------- GSAP vs global `* { transition: .5s }` ---------- */
.hero-content,
.hero-globe,
.hero-globe *,
.hero-word,
.hero-rule,
.hero-sub,
.hero-info-card,
.hero-chip,
.hero-chip-inner,
.scroll-indicator {
    transition: none;
}

/* buttons: only transition colours/shadow, never transform/opacity (GSAP owns those) */
.hero-actions > a {
    transition:
        background-color 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease;
}

.hero-actions > a:hover {
    box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.35);
}

/* ---------- Hero layout ---------- */
.hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh; /* same as the global .min-h-screen it replaces */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.hero-logo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.hero-logo img {
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    transition: scale 0.3s ease; /* only `scale`, so it never fights GSAP's transform */
}

/* replaces the old global `.mb-8 :hover { scale: 1.55 }` (which also hit the globe) */
@media (hover: hover) {
    .hero-logo img:hover {
        scale: 1.15;
    }
}

.hero-logo-inner {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    isolation: isolate;
    line-height: 0;
}

/* Centred with calc() instead of translate(-50%,-50%): GSAP owns `transform` on this element,
   and fixed width/height avoids relying on `height:auto` for SVGs (inconsistent on iOS). */
.hero-globe {
    --globe: clamp(170px, 42vw, 230px);
    position: absolute;
    width: var(--globe);
    height: var(--globe);
    left: calc(50% - var(--globe) / 2);
    top: calc(50% - var(--globe) / 2);
    display: block;
    z-index: -1;
    pointer-events: none;
    overflow: visible;
}

.hero-globe * {
    stroke: var(--theme-color);
    stroke-width: 1.2;
    opacity: 0.4;
}

.hero-globe .globe-outline {
    opacity: 0.6;
    stroke-width: 1.6;
}

.hero-globe .globe-lat {
    opacity: 0.25;
}

/* title words are masked so they can slide up into place (the title is italic, so leave room for overhang) */
.hero-content h1 {
    margin-bottom: 0;
}

.hero-word-mask {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    padding: 0 0.08em 0.14em;
    margin: 0 0.14em -0.14em;
}

.hero-word {
    display: inline-block;
}

.hero-rule {
    display: block;
    width: 64px;
    height: 4px;
    margin: 1.1rem auto 0.4rem;
    border-radius: 999px;
    background: var(--theme-color);
}

/* ---------- Quick-fact tiles ---------- */
.hero-info {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.6rem;
    width: 100%;
    max-width: 640px;
    margin: 0.5rem auto 0;
}

.hero-info-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.75rem 0.4rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.92);
    color: #1f2937;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.hero-info-card svg {
    width: 22px;
    height: 22px;
    margin-bottom: 0.2rem;
    fill: none;
    stroke: var(--theme-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.hero-info-card strong {
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.2;
}

.hero-info-card small {
    font-size: 0.7rem;
    color: #4b5563;
    line-height: 1.2;
}

/* ---------- Floating placards (small screens only) ---------- */
.hero-chips {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    display: none;
}

.hero-chip {
    position: absolute;
}

.hero-chip-inner {
    display: inline-block;
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.08);
    color: #1e6f8c;
    font-family: "Georgia", "Times New Roman", Times, serif;
    font-style: italic;
    font-size: 0.78rem;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* ---------- Drifting waves (CSS so reduced-motion can switch them off) ---------- */
.waves-svg path {
    transform-box: view-box;
    transform-origin: 50% 50%;
    transform: scaleX(1.06);
    animation: wave-drift 9s ease-in-out infinite alternate;
}

.waves-svg path:nth-child(2) {
    animation-duration: 12s;
    animation-direction: alternate-reverse;
}

.waves-svg path:nth-child(3) {
    animation-duration: 15s;
}

@keyframes wave-drift {
    from {
        transform: scaleX(1.06) translateX(-2%);
    }

    to {
        transform: scaleX(1.06) translateX(2%);
    }
}

/* ---------- Mobile & tablet ---------- */
/* Selectors are one class more specific than main.css's mobile rules, so no !important is needed. */
@media (max-width: 1024px) {
    .container-home.container-home-main {
        min-height: 0;
    }

    /* the left layer becomes a normal block, so its content defines the hero height */
    .container-home-main .left-side.layered-content {
        position: relative;
        height: auto;
        min-height: 0;
    }

    /* the picture/waves layer stays a full-size backdrop behind it */
    .container-home-main .right-side.layered-content {
        position: absolute;
        inset: 0;
        min-height: 0;
        pointer-events: none;
        background-attachment: scroll; /* "fixed" backgrounds break on iOS */
    }

    .hero-section {
        min-height: 0;
        padding: 6.8rem 0 8rem; /* top/bottom bands hold the floating placards */
    }

    .hero-chips {
        display: block;
    }

    .hero-logo {
        margin-bottom: 2.25rem;
    }

    .hero-logo img {
        width: clamp(5rem, 22vw, 6.5rem);
    }

    .hero-content {
        padding: 0 1rem;
    }

    .hero-content h1 {
        font-size: clamp(1.7rem, 7.4vw, 2.5rem);
        line-height: 1.15;
    }

    .hero-content .hero-sub {
        max-width: 32ch;
        margin: 0.25rem auto 0;
        font-size: 1rem;
        line-height: 1.5;
    }

    .hero-content .hero-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.6rem;
        width: 100%;
        max-width: 420px;
        margin: 1.4rem auto 1.4rem;
    }

    .hero-actions > a {
        display: block;
        margin: 0;
        padding: 11px 12px;
        text-align: center;
    }

    /* "Join Us" is the main call to action: first and full width */
    .hero-actions .btn-join {
        grid-column: 1 / -1;
        order: -1;
    }

    .scroll-indicator {
        display: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .waves-svg path {
        animation: none;
    }
}
</style>
