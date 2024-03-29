import { type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: () => void
  onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  return (
    <div className='view'>
      <input
        type="checkbox"
        className='toggle'
        onChange={handleChangeCheckbox}
        checked={completed}
      />
      <label>{title}</label>
      <button className='destroy' onClick={onRemoveTodo} />
    </div>
  )
}
