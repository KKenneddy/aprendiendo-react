import { type Middleware, configureStore } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser, type UsersWithId } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__store__', JSON.stringify(store.getState()))
}

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = (action as any)
  // fase 1: codigo se ejecuta antes de las action
  const previousState: { users: UsersWithId[] } = store.getState()

  next(action)

  // fase 2: codigo se ejecuta despues de las action
  if (type === 'users/deleteUserById') {
    const usersToRemove = previousState.users.find(user => user.id === payload)
    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: 'DELETE'
    })
      .then(_response => {
        // if (response.ok) toast.success(`Usuario ${payload}eliminado correctamente`)
        throw new Error('Error al eliminar usuario')
      })
      .catch((_e) => {
        toast.error(`Error al eliminar usuario ${(action as any).payload}`)
        if (usersToRemove != null) store.dispatch(rollbackUser(usersToRemove))
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    persistanceLocalStorageMiddleware,
    syncWithDatabase
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
