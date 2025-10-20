import { getCategories } from '@/stores/categories/categories.api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const pendings = ref({
    getCategories: false,
  })

  return {
    pendings,

    getCategories: async () => {
      try {
        pendings.value.getCategories = true
        const result = await getCategories()
        return result
      } catch (e: any) {
        console.error('Categories store.getCategories', e)
        return []
      } finally {
        pendings.value.getCategories = false
      }
    },
  }
})
