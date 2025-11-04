<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories/categories'

const categoriesStore = useCategoriesStore()
</script>

<template>
  <div>
    <h2 class="text-lg font-bold m-4">Products</h2>

    <img
      v-if="categoriesStore.pendings.getProducts"
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
</template>
