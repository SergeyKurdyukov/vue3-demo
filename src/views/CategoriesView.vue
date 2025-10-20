<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories/categories'
import type { ICategory } from '@/stores/categories/categories.types'
import { onMounted, ref } from 'vue'

const categories = ref<ICategory[]>([])
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  categories.value = await categoriesStore.getCategories()
  console.log('CategoriesView.onMounted categories:', categories.value)
})
</script>

<template>
  <div class="categories">
    <h1 class="text-xl font-bold my-4">Categories</h1>

    <div class="grid grid-cols-[1fr_3fr] gap-4">
      <img
        v-if="categoriesStore.pendings.getCategories"
        alt="Progress wheel"
        class="w-12"
        src="@/assets/spinner.svg"
      />
      <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>

      <div>Product list</div>
    </div>
  </div>
</template>

<style></style>
