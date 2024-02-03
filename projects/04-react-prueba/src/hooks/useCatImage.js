import { useEffect, useState } from 'react'

import { CAT_PREFIX_URL, WORD_POSITION } from '../utils/constants'
import { getRandomImage } from '../services/images'

export function useCatImage ({ fact }) {
  const [img, setImg] = useState()

  useEffect(() => {
    if (!fact) return
    const word = fact
      .split(' ', WORD_POSITION)
      .join(' ')

    getRandomImage(word)
      .then((img) => setImg(img))
  }, [fact])

  return { img: `${CAT_PREFIX_URL}${img}` }
}
