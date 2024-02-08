// const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export const fetchUser = async ({ pageParam }: { pageParam: unknown }) => {
  return await fetch(`https://randomuser.me/api/?results=10&seed=superkeny&page=${Number(pageParam)}`)
    .then(async response => {
      if (!response.ok) throw new Error('Error en la petición')
      return await response.json()
    })
    .then(data => {
      const currentPage = Number(data.info.page)
      const nextCursor = currentPage >= 10 ? undefined : currentPage + 1
      return {
        users: data.results,
        nextCursor
      }
    })
}
