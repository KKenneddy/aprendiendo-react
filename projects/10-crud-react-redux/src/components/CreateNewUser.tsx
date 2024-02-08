import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserAction } from '../hooks/useUserAction'
import { useState } from 'react'

export const CreateNewUser = () => {
  const { addUser } = useUserAction()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // para muchos
    const { name, email, github } = Object.fromEntries(formData.entries() as IterableIterator<[string, string]>)

    if ((name.length === 0) || (email.length === 0) || (github.length === 0)) {
      setResult('ko')
      return
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>Create User</Title>

      <form onSubmit={handleSumit}>
        <TextInput name='name' placeholder='Aquí el nombre'/>
        <TextInput name='email' placeholder='Aquí el email'/>
        <TextInput name='github' placeholder='Aquí el usuario de github'/>

        <div>
          <Button type='submit' style={{ marginTop: '16px' }}>Crear usuario</Button>
          <span>
            {result === 'ok' && <Badge color='green'>Usuario creado</Badge>}
            {result === 'ko' && <Badge color='red'>Error al crear el usuario</Badge>}
            {result === null && <Badge color='gray'>Crear usuario</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
