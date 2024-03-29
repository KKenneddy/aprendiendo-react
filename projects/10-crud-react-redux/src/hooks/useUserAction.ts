import { deleteUserById, addNewUser, type UserId, type User } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUserAction = () => {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return {
    removeUser,
    addUser
  }
}
