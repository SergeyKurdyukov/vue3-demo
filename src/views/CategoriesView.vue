<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories/categories'
import type { ICategory } from '@/stores/categories/categories.types'
import { onMounted, ref } from 'vue'

const categories = ref<ICategory[]>([])
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  categories.value = await categoriesStore.getCategories()
  console.log(
    'CategoriesView.onMounted categories:',
    categories.value,
    categoriesStore.filteredCategories,
  )
})

const selectedCategory = ref<ICategory | null>()
const onCategoryClick = async (category: ICategory) => {
  console.log('onCategoryClick category:', category)
  selectedCategory.value = category
  const products = await categoriesStore.getProducts(selectedCategory.value.id)
  console.log('onCategoryClick products:', products)
}
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
        <li
          v-for="category in categoriesStore.filteredCategories"
          :key="category.id"
          class="p-2 rounded-md border-2 hover:bg-stone-400 hover:text-white hover:font-bold"
          :class="
            selectedCategory?.id === category.id
              ? 'border-orange-500'
              : 'border-transparent'
          "
          @click="onCategoryClick(category)"
        >
          {{ category.name }}
        </li>
      </ul>

      <div>
        <ul>
          <li
            v-for="product in categoriesStore.products"
            :key="product.id"
            class="p-2 m-4 w-64 h-64 rounded-md border-1 hover:border-2 hover:border-blue-400 hover:bg-blue-200 hover:text-yellow-600 hover:font-bold"
          >
            {{ product.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
