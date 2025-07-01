<script setup lang="ts">
import { inject } from 'vue'
const i18n = inject('i18n') as { t: (key: string) => string }
</script>

<template>
  <footer class="bg-[#fca311] p-3 px-8 mt-2 rounded-t-3xl flex justify-center items-center">
    <span class="font-bold">{{ i18n.t('common.footer') }}</span>
  </footer>
</template>
