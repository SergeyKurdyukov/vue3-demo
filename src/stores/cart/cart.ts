import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IProductCart } from '../categories/categories.types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<IProductCart[]>([])

  const onAddToCart = (product: IProductCart) => {
    product.count = 1
    cart.value.push(product)
  }

  const removeFromCart = (productToRemove: IProductCart) => {
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
