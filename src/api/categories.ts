import { mande } from 'mande'

const categories = mande('https://api.escuelajs.co/api/v1/categories')

export const getCategories = () => categories.get()
