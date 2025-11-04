// FIXME: move into the folder like `categories` store
import { defineStore } from 'pinia'
import authApi from '@/stores/auth/auth.api'
import { computed, ref } from 'vue'

const SESSION_KEY = 'sessionKey'

export const useAuthStore = defineStore('auth', () => {
  const error = ref()
  const session = ref()
  const pendings = ref({
    login: false,
  })

  const isUserLoggedIn = computed(() => {
    const savedSession = sessionStorage.getItem(SESSION_KEY)
    return savedSession ? JSON.parse(savedSession) : null
  })

  const login = async (params: { email: string; password: string }) => {
    try {
      pendings.value.login = true
      session.value = await authApi.login(params)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session.value))
    } catch (e: any) {
      error.value = e.body
    } finally {
      pendings.value.login = false
    }
  }

  return {
    error,
    session,
    isUserLoggedIn,
    pendings,
    login,
  }
})
