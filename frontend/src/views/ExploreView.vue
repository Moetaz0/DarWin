<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ListingCard from '@/components/ListingCard.vue'
import { sampleListings } from '@/lib/sample'

const route = useRoute()
const q = ref(String(route.query.q ?? ''))
const maxPrice = ref(3000)
const tourOnly = ref(false)

const results = computed(() =>
  sampleListings.filter((l) =>
    (!q.value || `${l.title} ${l.city}`.toLowerCase().includes(q.value.toLowerCase())) &&
    l.price <= maxPrice.value &&
    (!tourOnly.value || l.tour)))
</script>

<template>
  <section class="bg-sand py-12 text-navy">
    <div class="mx-auto max-w-7xl px-5">
      <h1 class="text-3xl font-semibold">Explore homes</h1>

      <div class="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <input v-model="q" placeholder="City or keyword…"
          class="min-w-48 flex-1 rounded-full border border-navy/10 px-4 py-2 text-sm outline-none focus:border-teal" />
        <label class="flex items-center gap-2 text-sm">
          Max {{ maxPrice }} DT
          <input v-model.number="maxPrice" type="range" min="300" max="3000" step="100" class="accent-teal" />
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input v-model="tourOnly" type="checkbox" class="accent-teal" /> 360° tour only
        </label>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ListingCard v-for="l in results" :key="l.id" :item="l" />
      </div>
      <p v-if="!results.length" class="mt-10 text-center text-navy/60">No homes match your filters.</p>
    </div>
  </section>
</template>