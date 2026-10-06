<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <NavBar />
  <main class="min-h-[70vh]"><RouterView /></main>
  <FooterBar />
</template>