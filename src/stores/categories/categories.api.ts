import api from '../../api'
import type { ICategory } from './categories.types'

const categories = api('/categories')

export const getCategories = () => categories.get<ICategory[]>()
