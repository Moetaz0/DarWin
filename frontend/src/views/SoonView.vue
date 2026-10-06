<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="mx-auto max-w-xl px-5 py-28 text-center">
    <h1 class="text-3xl font-semibold">{{ route.meta.title }}</h1>
    <p class="mt-3 text-white/60">This page is coming in the next steps of the project.</p>
    <RouterLink to="/" class="btn btn-teal mt-8">Back home</RouterLink>
  </section>
</template>