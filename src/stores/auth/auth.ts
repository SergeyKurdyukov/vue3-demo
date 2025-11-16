// FIXME: move into the folder like `categories` store
import { defineStore } from 'pinia'
import authApi from '@/stores/auth/auth.api'
import { computed, ref } from 'vue'
import type { ILoginResponse, IUser } from './auth.types'

const SESSION_KEY = 'sessionKey'

export const useAuthStore = defineStore('auth', () => {
  const error = ref()
  const session = ref<ILoginResponse>()
  const currentUser = ref<IUser>()
  const pendings = ref({
    login: false,
    user: false,
  })

  const isUserLoggedIn = computed(() => {
    return !!savedSession.value
  })

  const savedSession = computed(() => {
    const ssValue = sessionStorage.getItem(SESSION_KEY)
    const parsedSSValue = ssValue ? JSON.parse(ssValue) : null
    return session.value || parsedSSValue
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

  const getUser = async () => {
    try {
      if (!savedSession.value) {
        throw new Error('Not authorized yet')
      }
      pendings.value.user = true
      currentUser.value = await authApi.getUserProfile(
        savedSession.value.access_token,
      )
    } catch (e: any) {
      error.value = e.body
    } finally {
      pendings.value.user = false
    }
  }

  return {
    error,
    session,
    isUserLoggedIn,
    savedSession,
    pendings,
    login,

    currentUser,
    getUser,
  }
})
