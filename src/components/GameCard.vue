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
    <div class="h-full flex flex-col border border-gray-700 rounded-2xl text-white hover:scale-105">
      <header class="m-0 rounded-t-2xl flex justify-center align-middle bg-opacity-5">
        <picture class="w-[400px] h-80 aspect-5/4">
          <source :srcset="`/games/${props.image}.avif`" type="image/avif" />
          <source :srcset="`/games/${props.image}.webp`" type="image/webp" />
          <img
            :src="`/games/${props.image}.png`"
            loading="lazy"
            :title="props.title"
            :alt="props.title"
            width="500"
            height="400"
            class="rounded-t-[16px] aspect-5/4"
          />
        </picture>
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
