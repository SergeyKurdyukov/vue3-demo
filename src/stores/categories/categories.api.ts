import api from '../../api'
import type { ICategory, IProduct } from './categories.types'

const categories = api('/categories')
const products = api('/products')

export const getCategories = () => categories.get<ICategory[]>()

export default {
  getCategories,
}
