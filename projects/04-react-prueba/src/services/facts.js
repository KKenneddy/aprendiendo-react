import { URL_RANDOM_FACT } from '../utils/constants'

export const getRandomFact = async () => {
  const res = await fetch(`${URL_RANDOM_FACT}/fact`)
  const data = await res.json()
  return data.fact
}
