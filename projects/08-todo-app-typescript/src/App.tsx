import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoTitle, type FilterValue, type TodoId, type Todo as TodoType } from './types'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './consts'
import { Header } from './components/Header'

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: false
  },
  {
    id: '2',
    title: 'todo 2',
    completed: false
  },
  {
    id: '3',
    title: 'todo 3',
    completed: true
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSeleted, setFilterSeleted] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSeleted(filter)
  }

  const activeCount = (todos.filter((todo) => !todo.completed)).length

  const filteredTodos = todos.filter(todo => {
    if (filterSeleted === TODO_FILTERS.ACTIVE) {
      return !todo.completed
    }
    if (filterSeleted === TODO_FILTERS.COMPLETED) {
      return todo.completed
    }
    return todo
  })

  const hanldeRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header saveTodo={handleAddTodo} />
      <Todos onToggleCompleteTodo={handleCompleted} onRemoveTodo={handleRemove} todos={filteredTodos} />
      <Footer
      activeCount={activeCount}
      completedCount={todos.length - activeCount}
      filterSelected={filterSeleted}
      onClearCompleted={hanldeRemoveAllCompleted}
      handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
