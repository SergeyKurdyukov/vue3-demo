<script setup lang="ts">
import { useCartStore } from '@/stores/cart/cart'
import { useCategoriesStore } from '@/stores/categories/categories'

const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()
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
        class="flex flex-col justify-between gap-2 p-2 m-4 w-45 rounded-md border-1 hover:border-blue-400 hover:bg-blue-200 hover:text-yellow-700 transition-all delay-150 duration-300 ease-in-out relative"
      >
        {{ product.title }}
        <button
          class="bg-orange-500/50 flex items-baseline justify-center hover:bg-orange-500 text-white text-lg rounded-full w-8 h-8 absolute right-5 transition-colors delay-150 duration-300 ease-in-out"
          @click="cartStore.onAddToCart(product)"
        >
          +
        </button>

        <img :src="product.images[0]" alt="Product image" />
      </li>
    </ul>
    <p v-else class="text-center">
      Oops... Could you please select any other category?
    </p>
  </div>
</template>
