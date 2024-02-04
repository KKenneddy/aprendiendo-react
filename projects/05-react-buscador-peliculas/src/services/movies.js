import { API_URL } from '../utils/constants'

export const searchMovies = async ({ search }) => {
  if (!search) return []

  try {
    const response = await fetch(`${API_URL}/?apikey=${import.meta.env.VITE_API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type
    }))
  } catch (error) {
    throw new Error('Error searching movies')
  }
}
