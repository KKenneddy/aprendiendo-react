import { SortBy, type User } from '../types.d'
import '../App.css'

interface Props {
  changeSorting: (sort: SortBy) => void
  users: User[]
  showColors: boolean
  deleteUser: (id: string) => void
}

export function UsersList ({ users, showColors, deleteUser, changeSorting }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NONE) }}>Foto</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td><img loading='lazy' src={user.picture.thumbnail} alt="" /></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => { deleteUser(user.email) }}>
                  Eliminar
                </button>
              </td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  )
}
