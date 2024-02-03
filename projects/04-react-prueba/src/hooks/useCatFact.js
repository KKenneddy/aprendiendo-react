import { useEffect, useState } from 'react'

import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshRandomCat = () => {
    getRandomFact()
      .then(newFact => setFact(newFact))
  }

  useEffect(refreshRandomCat, [])

  return { fact, refreshRandomCat }
}
