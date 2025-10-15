<script setup lang="ts">
const model = defineModel()
const { errors, type = 'text' } = defineProps<{
  errors?: string[]
  label?: string
  placeholder?: string
  type?: string
  name?: string
}>()
</script>

<template>
  <label class="grid grid-cols-[1fr_4fr] items-baseline">
    <span v-if="label">{{ label }}:</span>
    <input
      :type
      :placeholder
      :id="name"
      :name
      class="border hover:ring ring-sky-700 rounded-sm p-1"
      :class="[
        !!errors?.length ? 'mb-0 border-red-500' : 'mb-4 border-sky-700',
      ]"
      v-model="model"
    />
    <ul v-if="errors?.length" class="col-span-full">
      <li v-for="error in errors" :key="error" class="text-red-400 text-xs">
        {{ error }}
      </li>
    </ul>
  </label>
</template>
