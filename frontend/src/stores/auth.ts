import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/lib/api'
import type { User, Role } from '@/types'

export interface RegisterPayload {
  username: string
  email: string
  phone: string
  password: string
  role: Role
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthed = computed(() => !!user.value)
  const isLandlord = computed(() => user.value?.role === 'landlord')

  async function fetchMe() {
    try {
      user.value = (await api.get<User>('/auth/me/')).data
    } catch {
      logout()
    }
  }

  async function login(username: string, password: string) {
    const { data } = await api.post<{ access: string; refresh: string }>('/auth/login/', { username, password })
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    await fetchMe()
  }

  async function register(payload: RegisterPayload) {
    await api.post('/auth/register/', payload)
    await login(payload.username, payload.password)
  }

  function logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    user.value = null
  }

  return { user, isAuthed, isLandlord, fetchMe, login, register, logout }
})