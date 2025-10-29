import api from '@/stores/categories/categories.api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ICategory } from './categories.types'

export const useCategoriesStore = defineStore('categories', () => {
  const pendings = ref({
    getCategories: false,
  })

  const categories = ref<ICategory[]>([])

  const filteredCategories = computed(() => {
    return categories.value.filter((category) => {
      return !(
        category.image.includes('abstract') ||
        category.image.includes('placehold') ||
        category.name.includes('test') ||
        category.name.includes('undefined') ||
        category.name.includes('string')
      )
    })
  })

  const getCategories = async () => {
    try {
      pendings.value.getCategories = true
      const result = await api.getCategories()
      categories.value = result
      return result
    } catch (e: any) {
      console.error('Categories store.getCategories', e)
      return []
    } finally {
      pendings.value.getCategories = false
    }
  }

  return {
    pendings,

    categories,
    filteredCategories,
    getCategories,
  }
})
