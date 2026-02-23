import { describe, expect, test, vi, beforeEach } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createPinia, setActivePinia, type Pinia } from 'pinia'
import LoginView from '../LoginView.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('@/stores/auth/auth.api', () => ({
  default: {
    login: vi.fn(),
    getUserProfile: vi.fn(),
  },
}))

import authApi from '@/stores/auth/auth.api'
import { useAuthStore } from '@/stores/auth/auth'

describe('LoginView tests:', () => {
  let pinia: Pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    mockPush.mockClear()
    vi.mocked(authApi.login).mockReset()
    sessionStorage.clear()
  })

  test('renders heading and login form elements', async () => {
    const screen = render(LoginView, {
      global: { plugins: [pinia] },
    })

    await expect
      .element(screen.getByText('Vue3 demo project'))
      .toBeInTheDocument()
    await expect.element(screen.getByText('Login form')).toBeInTheDocument()
  })

  test('navigates to categories on successful login', async () => {
    vi.mocked(authApi.login).mockResolvedValue({
      access_token: 'fake-token',
      refresh_token: 'fake-refresh',
    })

    const screen = render(LoginView, {
      global: { plugins: [pinia] },
    })

    await screen.getByLabelText('Login').fill('john@mail.com')
    await screen.getByLabelText('Password').fill('changeme')
    await screen.getByText('Send').click()

    await vi.waitFor(() => {
      expect(vi.mocked(authApi.login)).toHaveBeenCalledWith({
        email: 'john@mail.com',
        password: 'changeme',
      })
      expect(mockPush).toHaveBeenCalledWith({ name: 'categories' })
    })
  })

  test('does not navigate on failed login', async () => {
    vi.mocked(authApi.login).mockRejectedValue({
      body: { message: 'Unauthorized' },
    })

    const screen = render(LoginView, {
      global: { plugins: [pinia] },
    })

    await screen.getByLabelText('Login').fill('wrong@mail.com')
    await screen.getByLabelText('Password').fill('wrongpass')
    await screen.getByText('Send').click()

    await vi.waitFor(() => {
      expect(vi.mocked(authApi.login)).toHaveBeenCalled()
    })

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('sets store error on failed login', async () => {
    vi.mocked(authApi.login).mockRejectedValue({
      body: { message: 'Unauthorized' },
    })

    const screen = render(LoginView, {
      global: { plugins: [pinia] },
    })

    await screen.getByLabelText('Login').fill('wrong@mail.com')
    await screen.getByLabelText('Password').fill('wrongpass')
    await screen.getByText('Send').click()

    await vi.waitFor(() => {
      const authStore = useAuthStore()
      expect(authStore.error).toEqual({ message: 'Unauthorized' })
    })
  })
})
