<style scoped>
.comm-card-container {
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    min-height: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: clamp(1rem, 2vw, 1.5rem);
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    font-size: 1rem;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.comm-card-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.difficulty-dot {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: var(--difficulty-color);
    box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.12);
}

.meta {
    width: 100%;
    display: grid;
    grid-template-columns: 4rem minmax(0, 1fr);
    align-items: center;
    gap: 1rem;
}

.meta-image {
    width: 4rem;
    height: 4rem;
    border-radius: 12px;
    background: #f8fafc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.meta-image img {
    width: 80%;
    height: 80%;
    object-fit: contain;
}

.full-name {
    margin: 0.25rem 1.5rem 0 0;
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.35;
    overflow-wrap: anywhere;
}

.main-name {
    margin: 0;
    color: #172033;
    font-size: 1.2rem;
}

.topic {
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.topic p {
    margin: 0.5rem 0;
}

.more {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: auto;
}

.more :deep(.el-button) {
    margin-left: 0;
}
</style>
<template>
    <div class="comm-card-container" :style="{ '--difficulty-color': difficultyColor }">
        <span class="difficulty-dot" role="img" :aria-label="`${difficultyType} difficulty`" :title="difficultyType"></span>
        <div class="meta">
            <div class="meta-image">
                <img :src="logo || metaImage" :alt="`${mainName} committee logo`">
            </div>
            <div class="meta-name">
                <h2 class="main-name">
                    {{ mainName }}
                </h2>
                <h4 class="full-name">
                    {{ fullName }}
                </h4>
            </div>

        </div>
        <el-divider></el-divider>
        <div class="topic">

            <p>
                <b> <em>Topic</em></b>: {{ topic }}
            </p>
            <p>
                <b><em>size</em></b>: {{ spots?spots:0 }}
            </p>
        </div>
        <el-divider></el-divider>
        <div class="more">
            <el-button type="warning" class="btn-signup" @click="signUp">Sign Up</el-button>
            <el-button type="info" plain class="btn-more-info" v-on:click="setCommittee">More Info</el-button>

        </div>
    </div>

</template>
<script setup lang="ts">

const props = defineProps<{
    mainName: string
    fullName: string
    topic: string
    logo: string
    SignUpLink: string
    metaImage: string
    type: string
    types?: string[]
    spots?:number
}>()
const difficultyType = computed(() => {
    return (props.types ?? []).find(type => ['Beginner', 'Intermediate', 'Expert', 'Highschooler', 'University'].includes(type))
        ?? props.type
})

const difficultyColors: Record<string, string> = {
    Beginner: '#2b9a91',
    Intermediate: '#c49a20',
    Expert: '#d77b35',
    Highschooler: '#7558bd',
    University: '#64748b',
}
const difficultyColor = computed(() => difficultyColors[difficultyType.value] ?? '#64748b')

const emit = defineEmits<{
    (e: 'set-committee', mainName: string): void
}>()


function setCommittee() {
    const el = document.getElementById('content')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
    emit('set-committee', props.mainName)
}

function signUp() {
    if (props.SignUpLink) {
        window.open(props.SignUpLink, '_blank', 'noopener,noreferrer');
    }
}

</script>
