import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProduct } from '../categories/categories.types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<IProduct[]>([])

  const onAddToCart = (product: IProduct) => {
    cart.value.push(product)
  }

  const removeFromCart = (productToRemove: IProduct) => {
    const indexToRemove = cart.value.findIndex(
      (product) => product.id === productToRemove.id,
    )
    if (indexToRemove > -1) {
      cart.value.splice(indexToRemove, 1)
    }
  }

  return {
    cart,
    onAddToCart,
    removeFromCart,
  }
})
