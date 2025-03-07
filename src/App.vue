<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <div
    class="relative min-w-dvw min-h-screen flex flex-col justify-between items-center m-auto bg-[#14213d] overflow-x-hidden z-0"
  >
    <PageHeader />
    <RouterView />
    <PageFooter />
  </div>
</template>
