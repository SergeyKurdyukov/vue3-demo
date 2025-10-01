import { defineStore } from 'pinia'
import authApi from '@/api/auth'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const session = ref({})
  const pendings = ref({
    login: false,
  })
  const isUserLoggedIn = computed(() => !!session)

  const login = async (params: { email: string; password: string }) => {
    try {
      pendings.value.login = true
      session.value = await authApi.login(params)
    } finally {
      pendings.value.login = false
    }
  }

  return {
    session,
    isUserLoggedIn,
    pendings,
    login,
  }
})
