import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import TheLoginForm from '@/components/TheLoginForm.vue'

describe('Login tests', () => {
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
    await expect(screen.getByText('This field is required')).toHaveLength(2)

    await expect
      .element(screen.getByLabelText('Login'))
      .toHaveClass('border-red-500')
    await expect
      .element(screen.getByLabelText('Password'))
      .toHaveClass('border-red-500')
  })
})
