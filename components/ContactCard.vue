<template>
  <div class="contact-card">
    <div class="card-accent" />

    <div class="card-body">
      <div class="avatar-wrap">
        <img v-if="picture" :src="picture" :alt="name" class="avatar-img" />
        <div v-else class="avatar-fallback">
          {{ initials }}
        </div>
      </div>

      <div class="card-content">
        <div class="card-header">
          <h3 class="name">{{ name }}</h3>
          <span class="role">{{ role }}</span>
        </div>

        <p class="bio">{{ bio }}</p>

        <div class="divider" />

        <div class="links">
          <a v-if="website" :href="website" target="_blank" rel="noopener noreferrer" class="link"
            aria-label="Visit website">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>Website</span>
          </a>

          <a v-if="linkedin" :href="linkedin" target="_blank" rel="noopener noreferrer" class="link"
            aria-label="View LinkedIn profile">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',

  props: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    picture: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
  },

  computed: {
    initials() {
      return this.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    },
  },
}
</script>

<style scoped>
/* ── Design tokens ──────────────────────────────────────── */
.contact-card {
  --radius-avatar: 50%;
  --radius-card: 10px;

  position: relative;
  background: var(--seasalt);
  border: 1px solid var(--french-gray);
  border-radius: var(--radius-card);
  overflow: hidden;
  max-width: 560px;
  width: 100%;
  margin: 5px;
  /* font-family: 'Georgia', 'Times New Roman', serif; */
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* ── Yellow left accent bar ─────────────────────────────── */
.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--yellow);
}

/* ── Card layout ────────────────────────────────────────── */
.card-body {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 28px 28px 28px 36px;
}

/* ── Avatar ─────────────────────────────────────────────── */
.avatar-wrap {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-avatar);
  border: 2px solid var(--theme-color);
  overflow: hidden;
  background: var(--french-gray);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-wrap:hover {
  box-shadow:
    0px 0px 0px 4px var(--special-green),
    0px 0px 0px 8px var(--special-yellow),
    0px 0px 0px 12px var(--special-red);
}


.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-fallback {
  font-size: 22px;
  font-weight: 400;
  color: var(--black);
  letter-spacing: 0.04em;
  /* font-family: 'Georgia', serif; */
}

/* ── Content ────────────────────────────────────────────── */
.card-content {
  flex: 1;
  min-width: 0;
}

.card-header {
  margin-bottom: 10px;
}

.name {
  font-size: 18px;
  font-weight: 400;
  color: var(--black);
  margin: 0 0 3px;
  letter-spacing: -0.01em;
  /* font-family: 'Georgia', serif; */
  line-height: 1.2;
}

.role {
  font-size: 11px;
  /* font-family: 'Courier New', 'Courier', monospace; */
  color: var(--french-gray);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.bio {
  font-size: 13px;
  color: var(--black);
  line-height: 1.7;
  margin: 0;
  opacity: 0.72;
  /* font-family: 'Georgia', serif; */

  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Divider ────────────────────────────────────────────── */
.divider {
  height: 1px;
  background: var(--french-gray);
  opacity: 0.5;
  margin: 14px 0;
}

/* ── Links ──────────────────────────────────────────────── */
.links {
  display: flex;
  gap: 20px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  /* font-family: 'Courier New', 'Courier', monospace; */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--black);
  text-decoration: none;
  padding-bottom: 1px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.link:hover {
  border-bottom-color: var(--yellow);
  color: var(--black);
}

.link-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  stroke: currentColor;
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 420px) {
  .card-body {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 24px 24px;
  }

  .card-accent {
    width: 100%;
    height: 4px;
  }

  .links {
    justify-content: center;
  }
}
</style>
