import { useLoginStore } from '~/store/login'

export default defineNuxtRouteMiddleware((to) => {
  const loginStore = useLoginStore()
  if (!loginStore.isLoggedIn && to.path !== '/login' && to.path !== '/register') {
    navigateTo('/login')
  }
})
