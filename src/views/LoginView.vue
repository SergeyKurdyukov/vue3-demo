<script setup lang="ts">
import TheLoginForm from '@/components/TheLoginForm.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const onSubmit = (credentials: { email: string; password: string }) => {
  console.log('LoginView.onSubmit credentials:', credentials)
  authStore.login(credentials)
}
</script>

<template>
  <main class="w-sm mx-auto h-full grid grid-rows-[auto_1fr]">
    <h1 class="text-4xl text-center mb-4">Vue3 demo project</h1>
    <div class="self-center">
      <TheLoginForm :is-pending="authStore.pendings.login" @submit="onSubmit" />
    </div>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
