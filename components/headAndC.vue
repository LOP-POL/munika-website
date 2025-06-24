<template>
  <section class="head-and-c-section" :class="{ inner: inner }">
    <div>
    <h2 class="head-and-c-title">
        <slot name="title"></slot>
    </h2>
    </div> 
    <el-divider v-if="divider"></el-divider>
    <div :class="['head-and-c-content', { 'row-form': rowForm, 'col-form': colForm }]">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  divider?: boolean,
  rowForm?: boolean,
  colForm?: boolean,
  inner?: boolean
}>()
</script>

<style scoped>
.head-and-c-section {
  background-color: var(--seasalt);
  padding: 10px;
  border-radius: 5px;
  max-width: 100vw;
  min-width:50vw;
  width:100%;
  margin: 0 auto;
  box-sizing: border-box;
}
.inner {
  min-width: 50%;
}
.head-and-c-title {
  color: var(--french-gray);
  margin-bottom: 0.5em;
  text-align:left;
}
.head-and-c-content {
  width: 100%;
  text-align:left;
}
.row-form {
  display: flex;
  justify-content: space-evenly;
  align-items: space-between;
}
.col-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
 
}
@media (max-width: 768px) {
    .head-and-c-section{
        display: block;
    }
    .row-form{
        display: block;
    }
    .col-form{
        display: block;
    }
}
</style>
