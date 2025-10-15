import { defineStore } from 'pinia'
import authApi from '@/api/auth'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const error = ref()
  const session = ref()
  const pendings = ref({
    login: false,
  })
  const isUserLoggedIn = computed(() => !!session.value)

  const login = async (params: { email: string; password: string }) => {
    try {
      pendings.value.login = true
      session.value = await authApi.login(params)
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
