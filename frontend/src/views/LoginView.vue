<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const form = reactive({ username: '', password: '' })
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    router.push('/')
  } catch {
    error.value = 'Invalid username or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto grid max-w-md px-5 py-16">
    <div class="rounded-3xl border border-white/10 bg-navy-2 p-8">
      <h1 class="text-2xl font-semibold">Welcome back</h1>
      <p class="mt-1 text-sm text-white/60">Sign in to continue your search.</p>
      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <input v-model="form.username" class="input" placeholder="Username" required />
        <input v-model="form.password" type="password" class="input" placeholder="Password" required />
        <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        <button class="btn btn-teal w-full" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
      </form>
      <p class="mt-6 text-center text-sm text-white/60">
        New here? <RouterLink to="/register" class="text-teal">Create an account</RouterLink>
      </p>
    </div>
  </section>
</template>