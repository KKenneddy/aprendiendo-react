import { URL_CAT_IMAGE } from '../utils/constants'

export const getRandomImage = async (word) => {
  const res = await fetch(`${URL_CAT_IMAGE}/${word}?fontSize=50&fontColor=red&json=true`)
  const data = await res.json()
  const { _id } = data
  const url = `/cat/${_id}/says/${word}`
  console.log('🚀 ~ getRandomImage ~ url:', url)
  return url
}
