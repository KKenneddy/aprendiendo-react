export function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(({
        id,
        title,
        year,
        poster
      }) => (
        <li className='movie' key={id}>
          <h3>{title}</h3>
          <p>{year}</p>
          <img src={poster} alt={title} />
        </li>
      ))}
    </ul>
  )
}

export function NoMovieResult () {
  return (
    <p>No se encontraron películas</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMovieResult />
  )
}
