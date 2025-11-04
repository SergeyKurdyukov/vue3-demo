<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories/categories'
import type { ICategory } from '@/stores/categories/categories.types'
import { onMounted, ref } from 'vue'

const categoriesStore = useCategoriesStore()

const categories = ref<ICategory[]>([])
const selectedCategory = ref<ICategory | null>()

onMounted(async () => {
  categories.value = await categoriesStore.getCategories()
  console.log(
    'CategoriesView.onMounted categories:',
    categories.value,
    categoriesStore.filteredCategories,
  )
  onCategoryClick(categories.value[0])
})

const onCategoryClick = async (category: ICategory) => {
  console.log('onCategoryClick category:', category)
  selectedCategory.value = category
  // selectedCategory.value = { id: 1 } // For DEBUGING only!!!
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
      <ul v-else>
        <li
          v-for="category in categoriesStore.filteredCategories"
          :key="category.id"
          class="p-2 rounded-md border-2 hover:bg-stone-400 hover:text-white hover:font-bold transition-all delay-150 duration-300 ease-in-out"
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
        <h2 class="text-lg font-bold m-4">Products</h2>

        <img
          v-if="categoriesStore.pendings.getCategories"
          alt="Progress wheel"
          class="w-12"
          src="@/assets/spinner.svg"
        />
        <ul v-else-if="categoriesStore.products.length" class="flex flex-wrap">
          <li
            v-for="product in categoriesStore.products"
            :key="product.id"
            class="flex flex-col justify-between gap-2 p-2 m-4 w-45 rounded-md border-1 hover:border-2 hover:border-blue-400 hover:bg-blue-200 hover:text-yellow-600 hover:font-bold transition-all delay-150 duration-300 ease-in-out"
          >
            {{ product.title }}
            <img :src="product.images[0]" alt="Product image" />
          </li>
        </ul>
        <p v-else class="text-center">
          Oops... Could you please select any other category?
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
