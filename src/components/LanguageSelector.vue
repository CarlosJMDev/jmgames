<script lang="ts" setup>
import { ref, inject } from 'vue'

const i18n = inject('i18n') as {
  t: (key: string) => string
  locale: string
}

const selectedLanguage = ref(i18n.locale)

const changeLanguage = () => {
  i18n.locale = selectedLanguage.value
}
</script>

<template>
  <div class="flex items-center gap-2 text-white">
    <label for="lang-select">{{ i18n.t('common.selectLanguage') }}: </label>
    <select id="lang-select" v-model="selectedLanguage" @change="changeLanguage">
      <option value="en" class="text-black">English</option>
      <option value="es" class="text-black">Español</option>
    </select>
  </div>
</template>
