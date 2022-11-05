import { Ref } from 'vue'
import { defineStore } from 'pinia'
import useGetData from '~~/composables/useGetData'

export const useLoginStore = defineStore('login', () => {
  const userId: Ref<number | null> = ref(null)
  const isLoggedIn: Ref<boolean> = ref(false)
  const isAdmin: Ref<boolean | null> = ref(false)
  const userEmail: Ref<string | null> = ref(null)
  const accessToken: Ref<string | null> = ref(null)

  const onLogin = async (token: string) => {
    accessToken.value = token
    isLoggedIn.value = true
    const {
      data: userData,
    }: {
      data: Ref<any>
    } = await useAsyncData('userData', () => useGetData('users/me/'))
    if (!userData.value) {
      onLogout()
      navigateTo('/login?error=user-not-found')
      return
    } else {
      userId.value = userData.value.id
      isAdmin.value = userData.value.isAdmin
      userEmail.value = userData.value.email
      navigateTo('/')
    }
  }

  const onLogout = () => {
    userId.value = null
    isLoggedIn.value = false
    isAdmin.value = null
    userEmail.value = null
    accessToken.value = null
  }

  return { userId, isLoggedIn, isAdmin, userEmail, accessToken, onLogin, onLogout }
})
