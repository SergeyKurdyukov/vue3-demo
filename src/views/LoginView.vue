<script setup lang="ts">
import TheLoginForm from '@/components/TheLoginForm.vue'
import { useCategoriesStore } from '@/stores/categories'

const store = useCategoriesStore()
const onSubmit = () => {
  console.log('LoginView.onSubmit')
  store.getCategories()
  console.log('LoginView.onSubmit', store.pendings.getCategories)
}
</script>

<template>
  <main class="w-sm mx-auto h-full grid grid-rows-[auto_1fr]">
    <h1 class="text-4xl text-center mb-4">Vue3 demo project</h1>
    <div class="self-center">
      <TheLoginForm
        :is-pending="store.pendings.getCategories"
        @submit="onSubmit"
      />
    </div>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
