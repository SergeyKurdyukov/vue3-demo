import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import TheLoginForm from '@/components/TheLoginForm.vue'

describe('Login tests', async () => {
  test('Check login form elements', async () => {
    const screen = render(TheLoginForm)
    await expect.element(screen.getByText('Login form')).toBeInTheDocument()
    await expect.element(screen.getByLabelText('Login')).toBeInTheDocument()
    await expect.element(screen.getByLabelText('Password')).toBeInTheDocument()
    await expect.element(screen.getByText('Send')).toBeInTheDocument()
  })

  test('Check empty fields processing', async () => {
    const screen = render(TheLoginForm)
    await screen.getByText('Send').click()
    const errorInputs = screen.container.querySelectorAll(
      'input.border-red-500',
    )
    expect(errorInputs.length).toBe(2)
    await expect
      .element(screen.getByLabelText('Login'))
      .toHaveClass('border-red-500')
    await expect
      .element(screen.getByLabelText('Password'))
      .toHaveClass('border-red-500')
  })

  test('Check partial empty fields processing', async () => {
    const screen = render(TheLoginForm)
    await screen.getByText('Send').click()

    const loginInput = screen.getByLabelText('Login')
    await expect.element(loginInput).toHaveClass('border-red-500')

    await loginInput.fill('test-login')
    await expect.element(loginInput).not.toHaveClass('border-red-500')

    const passwordInput = screen.getByLabelText('Password')
    await expect.element(passwordInput).toHaveClass('border-red-500')

    await passwordInput.fill('test-password')
    await expect.element(passwordInput).not.toHaveClass('border-red-500')
  })
})
