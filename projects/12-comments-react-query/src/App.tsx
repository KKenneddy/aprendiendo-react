import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, type CommentWithId, type Comment, postComment } from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App () {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'], // <-----
    getComments
  )
  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments'])

      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])
      // actualizar la cache manualmente
      queryClient.setQueryData(['comments'], (oldData?: Comment[]): Comment[] => {
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      // hacer un refresh para actualizar la cache
      // await queryClient.invalidateQueries({
      //   queryKey: ['comments']
      // })

      return { previousComments } // -----> context
      // context.previousComments es lo de abajo
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return

    event.preventDefault()
    // ---> ???
    const form = event.currentTarget
    const data = new FormData(form)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message })
      form.reset()
    }
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>

        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />

      </div>
      <div className='col-span-1 p-8 bg-black'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>

          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
