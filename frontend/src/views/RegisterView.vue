<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore, type RegisterPayload } from '@/stores/auth'
import type { Role } from '@/types'

const auth = useAuthStore()
const router = useRouter()
const form = reactive<RegisterPayload>({ username: '', email: '', phone: '', password: '', role: 'client' })
const roles: { value: Role; label: string }[] = [
  { value: 'client', label: "I'm looking" },
  { value: 'landlord', label: "I'm a landlord" },
]
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.register({ ...form })
    router.push('/')
  } catch (e) {
    const data = axios.isAxiosError(e) ? e.response?.data : null
    error.value = data ? Object.values(data).flat().join(' ') : 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto grid max-w-md px-5 py-16">
    <div class="rounded-3xl border border-white/10 bg-navy-2 p-8">
      <h1 class="text-2xl font-semibold">Create your account</h1>
      <div class="mt-5 grid grid-cols-2 gap-2 rounded-full bg-white/5 p-1 text-sm">
        <button v-for="r in roles" :key="r.value" type="button" class="rounded-full py-2 transition"
          :class="form.role === r.value ? 'bg-teal text-white' : 'text-white/60'" @click="form.role = r.value">
          {{ r.label }}
        </button>
      </div>
      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <input v-model="form.username" class="input" placeholder="Username" required />
        <input v-model="form.email" type="email" class="input" placeholder="Email" required />
        <input v-model="form.phone" class="input" placeholder="Phone (optional)" />
        <input v-model="form.password" type="password" minlength="8" class="input" placeholder="Password (8+ characters)" required />
        <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        <button class="btn btn-teal w-full" :disabled="loading">{{ loading ? 'Creating…' : 'Create account' }}</button>
      </form>
      <p class="mt-6 text-center text-sm text-white/60">
        Already registered? <RouterLink to="/login" class="text-teal">Sign in</RouterLink>
      </p>
    </div>
  </section>
</template>