<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ListingCard from '@/components/ListingCard.vue'
import { sampleListings } from '@/lib/sample'

const router = useRouter()
const q = ref('')
const search = () => router.push({ path: '/explore', query: { q: q.value } })

const features = [
  { icon: '360°', title: 'Virtual Tours (360°)' },
  { icon: '✦', title: 'AI Room & Amenity Detection' },
  { icon: '★', title: 'Smart Recommendations' },
  { icon: '▣', title: 'Duplicate & Fake Photo Detection' },
  { icon: '💬', title: 'Secure Messaging & Reviews' },
  { icon: '🌐', title: 'Multilingual Assistant' },
]
</script>

<template>
  <!-- Hero: put a photo at public/hero.jpg to replace the gradient -->
  <section class="relative overflow-hidden bg-cover bg-center"
    style="background-image: linear-gradient(90deg, #0b1726 25%, rgba(11,23,38,.55)), url('/hero.jpg'), linear-gradient(135deg, #0b1726, #0e4a5a 60%, #19b5a5)">
    <div class="mx-auto max-w-7xl px-5 py-24 md:py-32">
      <h1 class="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
        Find the right home,<br />the <span class="text-teal">smart</span> way.
      </h1>
      <p class="mt-5 text-white/70">Virtual tours · AI-powered search · Trusted listings</p>

      <form class="mt-8 flex max-w-xl items-center rounded-full bg-white p-1.5 shadow-xl" @submit.prevent="search">
        <input v-model="q" class="flex-1 bg-transparent px-5 text-sm text-navy outline-none placeholder:text-navy/40"
          placeholder="e.g. 2-bedroom apartment in Tunis under 1200 DT…" />
        <button class="grid h-11 w-11 place-items-center rounded-full bg-teal text-white" aria-label="Search">→</button>
      </form>
    </div>
  </section>

  <section class="border-y border-white/5 bg-navy-2/60">
    <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-12 md:grid-cols-3 lg:grid-cols-6">
      <div v-for="f in features" :key="f.title" class="text-center">
        <div class="mx-auto grid h-14 w-14 place-items-center rounded-full border border-teal/40 bg-teal/10 text-teal">{{ f.icon }}</div>
        <p class="mt-3 text-xs text-white/80">{{ f.title }}</p>
      </div>
    </div>
  </section>

  <section class="bg-sand py-16 text-navy">
    <div class="mx-auto max-w-7xl px-5">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-3xl font-semibold">More than listings, <span class="text-teal">real experiences.</span></h2>
          <p class="mt-2 text-navy/60">Handpicked homes you can walk through before you visit.</p>
        </div>
        <RouterLink to="/explore" class="hidden text-sm font-medium text-teal md:block">View all →</RouterLink>
      </div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ListingCard v-for="l in sampleListings.slice(0, 3)" :key="l.id" :item="l" />
      </div>
    </div>
  </section>
</template>