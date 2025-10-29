import api from '../../api'
import type { ICategory, IProduct } from './categories.types'

const categories = api('/categories')
const products = api('/products')

export const getCategories = () => categories.get<ICategory[]>()

export const getProducts = (categoryId: ICategory['id']) =>
  products.get<IProduct[]>({
    query: { categoryId },
  })

export default {
  getCategories,
  getProducts,
}
