<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String,
})
</script>

<template>
  <RouterLink :to="{ name: props.link }">
    <div class="w-52 flex flex-col border border-black rounded-b-md">
      <img :src="props.image" :alt="props.title" />
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </RouterLink>
</template>
