import { useUsers } from '../hooks/useUser'

export const Results = () => {
  const { users } = useUsers()
  return (
    <h3>results {users.length}</h3>
  )
}
