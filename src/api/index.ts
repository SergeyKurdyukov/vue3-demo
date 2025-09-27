import { mande } from 'mande'

export default (url: string) => {
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
  return mande(`${import.meta.env.VITE_API_BASE_URL}${url}`)
}
