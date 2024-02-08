import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UserList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUser'
import { Results } from './components/Results'

function App () {
  const {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleReset = async (): Promise<void> => {
    await refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba Técnica</h1>
      <Results/>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordernar por país' : 'Ordenar por país'}
        </button>

        <button onClick={() => { void handleReset() }}>
          Resetear estado
        </button>

        <input placeholder='Filtra por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} type="text" />

        {sorting}
      </header>
      <main>

      {users.length > 0 &&
        (<UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />)
      }

        {isLoading && <strong>Cargando...</strong>}

        {isError && <p>Ha ocurrido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage && <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>}

      </main>
    </div>
  )
}

export default App
