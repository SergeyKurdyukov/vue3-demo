<script setup lang="ts">
import { useRegle } from '@regle/core'
import { required } from '@regle/rules'
import { ref } from 'vue'
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
</template>

<style>
@import 'tailwindcss';
</style>
