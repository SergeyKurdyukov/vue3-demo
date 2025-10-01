<script setup lang="ts">
import { useRegle } from '@regle/core'
import { required } from '@regle/rules'
import { ref, useTemplateRef, watch } from 'vue'
import BaseInput from './controls/BaseInput.vue'

const formData = ref({
  email: '',
  password: '',
})

type TFormData = typeof formData.value

const emit = defineEmits<{
  (e: 'submit', formData: TFormData): void
}>()

const props = defineProps<{
  isPending: boolean
  loginError?: any
}>()

const validationRules = {
  email: { required },
  password: { required },
}

const { r$ } = useRegle(formData, validationRules)

const onSubmit = async () => {
  console.log('onSubmit formData:', formData.value)
  const { valid } = await r$.$validate()
  if (!valid) {
    console.error('onSubmit form has errors:', r$, r$.$errors)
    return
  }
  emit('submit', formData.value)
}

const loginPopoverRef = useTemplateRef('loginPopover')
watch(
  () => props.loginError,
  () => {
    // Show the login error
    if (props.loginError) {
      ;(loginPopoverRef.value as HTMLDivElement).showPopover()
    }
  },
)
</script>

<template>
  <form class="border rounded-md" @submit.prevent="onSubmit">
    <h3 class="bg-sky-700 text-white text-center px-3 py-2">Login form</h3>
    <div class="flex flex-col px-3 py-2">
      <label class="grid grid-cols-[1fr_4fr] items-baseline">
        <span>Login:</span>
        <BaseInput
          v-model="formData.email"
          placeholder="E-mail: john@mail.com"
          :errors="r$.email.$errors"
        />
      </label>

      <label class="grid grid-cols-[1fr_4fr] items-baseline">
        <span>Password:</span>
        <BaseInput
          v-model="formData.password"
          placeholder="Password: changeme"
          :errors="r$.password.$errors"
          type="password"
        />
      </label>
      <button
        class="border rounded-full bg-emerald-400 hover:bg-emerald-500 disabled:bg-emerald-300 border-emerald-400 text-white w-fit px-4 py-1 self-center"
        :disabled="isPending"
        type="submit"
      >
        {{ isPending ? 'Wait...' : 'Send' }}
      </button>
    </div>
  </form>

  <div
    popover
    ref="loginPopover"
    id="login-popover"
    class="top-[5%] left-[50%] transform-[translateX(-50%)] border border-red-500 rounded-md bg-red-50 p-4 transition delay-150 duration-300 ease-in-out opacity-0 starting:open:opacity-0 open:opacity-100"
  >
    {{ props.loginError?.message }}
  </div>
</template>

<style>
@import 'tailwindcss';
</style>
