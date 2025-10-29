export interface ICategory {
  creationAt: string
  id: number
  image: string
  name: string
  slug: string
  updatedAt: string
}

export interface IProduct {
  category: ICategory
  creationAt: string
  description: string
  id: number
  images: string[]
  price: number
  slug: string
  title: string
  updatedAt: string
}
