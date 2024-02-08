import { fetchUser } from '../services/users'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type User } from '../types'

interface UserQuery {
  users: User[]
  nextCursor?: number
}

export const useUsers = () => {
  const {
    isLoading,
    isError,
    data,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery<UserQuery>({
    queryKey: ['users'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => await fetchUser({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5 // 5 minutos
  })

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
