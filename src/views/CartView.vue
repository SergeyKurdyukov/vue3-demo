<script lang="ts" setup>
import { useCartStore } from '@/stores/cart/cart'
import BaseCounter from '@/components/controls/BaseCounter.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="cart">
    <h1 class="text-xl font-bold my-4">Cart</h1>

    <div v-if="!cartStore.cart.length">
      <p class="text-center">Your cart is empty</p>
    </div>
    <ul v-else>
      <li
        v-for="product in cartStore.cart"
        :key="product.id"
        class="flex flex-row mb-6 rounded-sm relative shadow-sm hover:shadow-lg"
      >
        <img
          :src="product.images[0]"
          alt="Product image"
          class="w-60 rounded-l-sm"
        />
        <div class="p-4">
          <h3 class="text-md font-bold mb-4">{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <BaseCounter v-model:count="product.count" />
        </div>

        <button
          class="bg-orange-500/50 hover:bg-orange-500 text-white text-lg rounded-full w-8 h-8 absolute top-3 right-3 transition-colors delay-150 duration-300 ease-in-out"
          @click="cartStore.removeFromCart(product)"
        >
          -
        </button>
      </li>
    </ul>
  </div>
</template>
