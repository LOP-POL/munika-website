<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
    member: {
        type: Object,
        required: true,

    }
})


const expanded = ref(false)

const initials = computed(() =>
props.member.fullName
.split(' ')
.map(n => n[0])
.slice(0, 2)
.join('')
.toUpperCase()
)

const info = computed(() => props.member.info ?? [])
const hasInfo = computed(() => info.value.length > 0)

const studywhere = computed(() =>
info.value.find(i => i.type === 'studywhere')?.value ?? null
)

const studywhat = computed(() =>
info.value.find(i => i.type === 'studywhat')?.value ?? null
)

const platformLink = computed(() =>
info.value.find(i => i.type === 'link')?.value ?? null
)

</script>
<template>
    <div class="member-card">
        <div class="layer">
            <div class="portrait-wrap">
                <img v-if="member.picture" :src="member.picture" :alt="member.fullName" class="portrait" />
                <div v-else class="portrait-fallback">
                    <span>{{ initials }}</span>
                </div>
            </div>

        </div>
        <el-divider></el-divider>
        <div class="card-base">
            <div class="name-block">
                <p class="team-label">{{ member.role }}</p>
                <h3 class="full-name">{{ member.fullName.length ? member.fullName : member.name }}</h3>
            </div>

            <button v-if="hasInfo" class="expand-btn" :aria-expanded="expanded" @click="expanded = !expanded">
                <span class="expand-label">{{ expanded ? 'Close' : 'Read more' }}</span>
                <span class="expand-icon" :class="{ rotated: expanded }">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M3 6l5 5 5-5" />
                    </svg>
                </span>
            </button>
        </div>
        <!-- Expandable drawer -->
        <Transition name="drawer">
            <div v-if="expanded && hasInfo" class="drawer">
                <div class="drawer-inner">

                    <p v-if="studywhere" class="drawer-section">
                        <span class="drawer-eyebrow">Where I study</span>
                        {{ studywhere }}
                    </p>

                    <p v-if="studywhat" class="drawer-section">
                        <span class="drawer-eyebrow">What I study</span>
                        {{ studywhat }}
                    </p>

                    <a v-if="platformLink" :href="platformLink.link" target="_blank" rel="noopener noreferrer"
                        class="platform-link">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M10 2h4m0 0v4m0-4L7 9" />
                        </svg>
                        {{ platformLink.platform }}
                    </a>

                </div>
            </div>
        </Transition>

    </div>
</template>
<style scoped>
.member-card {
    display: flex;
    flex-direction: column;
    width: 400px;
    /* box-shadow: 0px 0px 10px black; */
    border-radius: 20px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border-left: solid 5px var(--border-primary);
    border-right: solid 5px var(--border-primary);
    border-bottom: solid 5px var(--border-accent);
    min-height:400px;
    background-color: whitesmoke;
}

.member-card:hover .portrait {
    transform: scale(1.02);
}

.layer {
    padding: 0px;
    /* box-shadow: inset 0px 0px 5px black; */
    border-radius: inherit;
    /* background-color: var(--theme-color); */

}

.portrait-wrap {
    width: 100%;
    border-radius: 20px;
    margin: 0
}

.portrait {
    object-fit: cover;
    border-radius: inherit;
    width: 100%;

    margin: 0;

}

.portrait-fallback span {
    font-size: 5em;
    color: var(--gray);
    font-family: 'Georgia', serif;
    letter-spacing: -0.02em;
    opacity: 0.5;

}

.portrait-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.team-label {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--theme-color);
    margin: 0 0 4px;
}

.card-base {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    grid-area: base;
    width: 100%;

}

.name-block {
    max-width: 50%;
}

.full-name {
    font-size: 17px;
    font-weight: 400;
    margin: 0;
    line-height: 1.2;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:black
   
}

.expand-btn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: 1px solid var(--gray-dim);
    border-radius: 20px;
    padding: 5px 10px 5px 12px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    white-space: nowrap;

    background: rgba(255, 217, 0, 0.317);
}

.expand-btn:hover {
    border-color: var(--theme-color);
    background: rgba(255, 216, 0, 0.06);

}

.expand-label {
    font-size: 12px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--gray);
    transition: color 0.2s;
}

.expand-btn:hover .expand-label {
    color: var(--theme-color);
}

.expand-icon {
    display: flex;
    align-items: center;
    transition: transform 0.3s cubic-bezier(.2, .8, .2, 1);
}

.expand-icon svg {
    width: 12px;
    height: 12px;
    stroke: var(--french-gray);
    transition: stroke 0.2s;
}

.expand-btn:hover .expand-icon svg {
    stroke: var(--theme-color);
}

.expand-icon.rotated {
    transform: rotate(180deg);
}

/* ── Drawer ───────────────────── */
.drawer {
    border-top: 1px solid var(--gray-dim);
    overflow: hidden;
    width: 100%;
}

.drawer-inner {
    padding: 16px 18px 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.drawer-section {
    margin: 0;
    color: var(--gray);
    line-height: 1.75;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.drawer-eyebrow {
    font-size: 20px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--theme-color);
    opacity: 0.7;
}

.platform-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--gray);
    text-decoration: none;
    border-bottom: 1px solid var(--gray-dim);
    padding-bottom: 2px;
    width: fit-content;
    transition: color 0.2s, border-color 0.2s;
}

.platform-link:hover {
    color: var(--theme-color);
    border-color: var(--theme-color);
}

.platform-link svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
}

/* ── Drawer transition ───────────────────── */
.drawer-enter-active {
    transition: max-height 0.35s cubic-bezier(.2, .8, .2, 1), opacity 0.25s ease;
}

.drawer-leave-active {
    transition: max-height 0.28s cubic-bezier(.8, .2, 1, .2), opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    max-height: 0;
    opacity: 0;
}

.drawer-enter-to,
.drawer-leave-from {
    max-height: 400px;
    opacity: 1;
}
</style>