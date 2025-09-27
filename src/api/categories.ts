import api from '.'

const categories = api('/categories')

export const getCategories = () => categories.get()
