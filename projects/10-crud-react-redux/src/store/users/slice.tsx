import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'kkenneddy',
    email: 'XXXXXXXXXXXXXX',
    github: 'kkenneddy'
  },
  {
    id: '2',
    name: 'midu',
    email: 'XXXXXXXXXXXXXX',
    github: 'midudev'
  },
  {
    id: '3',
    name: 'Maria',
    email: 'XXXXXXXXXXXXXX',
    github: 'XXXXXXXXXXXXXX'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UsersWithId extends User {
  id: UserId
}

const initialState: UsersWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__store__')
  if (persistedState !== null) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      return [...state, { id, ...action.payload }]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UsersWithId>) => {
      const isUserAlready = state.some(user => user.id === action.payload.id)

      if (!isUserAlready) {
        return [...state, action.payload]
      }
    }
  }
})

export default usersSlice.reducer

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions
