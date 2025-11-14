<script setup lang="ts">
const count = defineModel<number>('count', { type: Number, default: 0 })
</script>

<template>
  <div class="w-max border border-stone-400 rounded-sm">
    <button
      @click="count--"
      :disabled="!count"
      class="w-5 cursor-pointer bg-stone-400 hover:bg-stone-500 disabled:bg-stone-300 disabled:cursor-default"
    >
      -
    </button>
    <input disabled v-model="count" class="w-10 text-center" />
    <button
      @click="count++"
      class="w-5 cursor-pointer bg-stone-400 hover:bg-stone-500"
    >
      +
    </button>
  </div>
</template>
