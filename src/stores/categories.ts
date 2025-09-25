import { getCategories } from '@/api/categories'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const pendings = ref({
    getCategories: false,
  })

  return {
    pendings,

    getCategories: async () => {
      pendings.value.getCategories = true
      const result = await getCategories()
      pendings.value.getCategories = false
      return result
    },
  }
})
