<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/images/logo.png'

const auth = useAuthStore()
const router = useRouter()
const open = ref(false)
const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/map', label: 'Map' },
  { to: '/tours', label: 'Virtual Tours' },
  { to: '/assistant', label: 'AI Assistant' },
]

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/5 bg-navy/80 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
      <RouterLink to="/"><img :src="logo" alt="DarWin" class="h-9" /></RouterLink>

      <nav class="hidden items-center gap-8 text-sm text-white/80 md:flex">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="hover:text-teal"
          active-class="text-teal">{{ l.label }}</RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <template v-if="auth.isAuthed">
          <span class="text-sm text-white/70">{{ auth.user?.username }}</span>
          <RouterLink v-if="auth.isLandlord" to="/add-property" class="btn btn-teal">Add a property</RouterLink>
          <button class="btn btn-ghost" @click="logout">Sign out</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-ghost">Sign in</RouterLink>
          <RouterLink to="/register" class="btn btn-teal">Add a property</RouterLink>
        </template>
      </div>

      <button class="md:hidden" @click="open = !open" aria-label="Menu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <div v-if="open" class="flex flex-col gap-4 border-t border-white/5 px-5 py-4 text-sm md:hidden" @click="open = false">
      <RouterLink v-for="l in links" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
      <RouterLink v-if="!auth.isAuthed" to="/login">Sign in</RouterLink>
      <RouterLink v-if="!auth.isAuthed" to="/register">Create account</RouterLink>
      <button v-else class="text-left" @click="logout">Sign out</button>
    </div>
  </header>
</template>