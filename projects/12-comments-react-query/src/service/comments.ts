export interface Comment {
  title: string
  message: string
  preview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

// ApiKey could be public as service is 100% free
const masterKey = 'X-MASTER-KEY'
const accessKey = 'X-ACCESS-KEY'

export const getComments = async () => {
  const response = await fetch('https://api.jsonbin.io/v3/b/65c41aefdc74654018a1c97c', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-ACCESS-KEY': accessKey,
      'X-MASTER-KEY': masterKey
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}

// const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export const postComment = async (comment: Comment) => {
  // await delay(1500)
  // throw new Error('error')

  const comments = await getComments()

  const id = window.crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

  const response = await fetch('https://api.jsonbin.io/v3/b/65c41aefdc74654018a1c97c', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-ACCESS-KEY': accessKey,
      'X-MASTER-KEY': masterKey
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}
