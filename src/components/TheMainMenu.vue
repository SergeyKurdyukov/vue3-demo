<script setup lang="ts">
import { useRoute } from 'vue-router'

const menuItems = [
  { name: 'Categories', routeName: 'categories', isActive: true },
  { name: 'Cart', routeName: 'cart', isActive: false },
  { name: 'My Profile', routeName: 'myProfile', isActive: false },
]

const route = useRoute()
</script>

<template>
  <div class="border-b-1 border-slate-600 py-2 flex">
    <div v-for="(item, index) in menuItems" :key="item.name" class="">
      <RouterLink
        :to="{ name: item.routeName }"
        :class="
          route.name === item.routeName
            ? 'border-orange-500 font-semibold'
            : 'border-transparent'
        "
        class="px-2 border-b-4 border-solid"
      >
        {{ item.name }}
      </RouterLink>
      <span
        v-if="index !== menuItems.length - 1"
        class="text-sky-700 px-1 font-bold"
        >|</span
      >
    </div>
  </div>
</template>
