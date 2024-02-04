import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFristInput = useRef(true)

  useEffect(() => {
    if (isFristInput.current) {
      isFristInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return undefined
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película solo con número')
      return undefined
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return undefined
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}
