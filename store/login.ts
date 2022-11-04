import { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const userId: Ref<number | null> = ref(null)
  const isLoggedIn: Ref<boolean> = ref(false)
  const isAdmin: Ref<boolean | null> = ref(false)
  const email: Ref<string | null> = ref(null)
  const accessToken: Ref<string | null> = ref(null)

  const onLogin = () => {
    // do something
  }

  return { userId, isLoggedIn, isAdmin, email, accessToken, onLogin }
})
