<script setup lang="ts">
import type { Listing } from '@/types'

defineProps<{ item: Listing }>()
</script>

<template>
  <article class="group overflow-hidden rounded-2xl bg-white text-navy shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div class="relative h-44" :style="{ background: item.gradient }">
      <span v-if="item.tour" class="absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs text-white">360° tour</span>
      <span class="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-teal">♥</span>
    </div>
    <div class="p-4">
      <h3 class="font-semibold">{{ item.title }}</h3>
      <p class="text-sm text-navy/60">{{ item.city }} · {{ item.rooms }} rooms · {{ item.area }} m²</p>
      <p class="mt-3 text-lg font-semibold text-teal">{{ item.price }} DT <span class="text-xs font-normal text-navy/50">/ month</span></p>
    </div>
  </article>
</template>