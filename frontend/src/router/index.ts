import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    landlordOnly?: boolean
    guestOnly?: boolean
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/explore', name: 'explore', component: () => import('@/views/ExploreView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { guestOnly: true } },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue'), meta: { guestOnly: true } },
    {
      path: '/add-property', name: 'add', component: () => import('@/views/SoonView.vue'),
      meta: { requiresAuth: true, landlordOnly: true, title: 'Add a property' },
    },
    { path: '/map', component: () => import('@/views/SoonView.vue'), meta: { title: 'Map' } },
    { path: '/tours', component: () => import('@/views/SoonView.vue'), meta: { title: 'Virtual Tours' } },
    { path: '/assistant', component: () => import('@/views/SoonView.vue'), meta: { title: 'AI Assistant' } },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.user && localStorage.getItem('access')) await auth.fetchMe()
  if (to.meta.requiresAuth && !auth.isAuthed) return { name: 'login' }
  if (to.meta.landlordOnly && !auth.isLandlord) return { name: 'home' }
  if (to.meta.guestOnly && auth.isAuthed) return { name: 'home' }
})

export default router