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
    <div class="h-full flex flex-col border border-gray-700 rounded-2xl text-white">
      <header class="m-0 rounded-t-2xl flex justify-center align-middle bg-slate-900 bg-opacity-5">
        <img
          :src="props.image"
          loading="lazy"
          :title="props.title"
          :alt="props.title"
          width="500"
          height="300"
          style="width: 100%; height: auto; border-radius: 16px 16px 0 0"
          class="hover:scale-105 hover:rounded-b-[16px]"
        />
      </header>
      <main class="p-4 flex flex-col gap-2">
        <h1 class="text-lg flex text-[#fca311] gap-2">
          <strong>{{ title }}</strong>
        </h1>
        <p class="">{{ description }}</p>
      </main>
    </div>
  </RouterLink>
</template>
