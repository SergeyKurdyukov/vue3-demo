import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import TheLoginForm from '@/components/TheLoginForm.vue'

test('Login form elements', async () => {
  const screen = render(TheLoginForm)
  await expect.element(screen.getByText('Login form')).toBeInTheDocument()
  await expect.element(screen.getByLabelText('Login')).toBeInTheDocument()
  await expect.element(screen.getByLabelText('Password')).toBeInTheDocument()
  await expect.element(screen.getByText('Send')).toBeInTheDocument()
})
