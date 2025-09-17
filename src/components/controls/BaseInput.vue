<script setup lang="ts">
const model = defineModel()
const { errors, type = 'text' } = defineProps<{
  errors?: string[]
  placeholder?: string
  type?: string
}>()
</script>

<template>
  <input
    :type
    :placeholder
    class="border border-sky-700 hover:ring ring-sky-700 rounded-sm p-1"
    :class="[!!errors?.length ? 'mb-0' : 'mb-3']"
    v-model="model"
  />
  <ul v-if="errors?.length">
    <li v-for="error in errors" :key="error" class="text-red-400 text-xs">
      {{ error }}
    </li>
  </ul>
</template>
