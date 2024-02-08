import { FILTERS_BUTTON } from '../consts'
import { type FilterValue } from '../types'

interface Props {
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <ul className='filters'>
      {
        Object.entries(FILTERS_BUTTON).map(([key, { literal, href }]) => {
          const isSelectd = filterSelected === key
          const className = isSelectd ? 'selected' : ''

          return (
            <li key={key}>
              <a
              href={href}
              className={className}
              onClick={(event) => {
                event.preventDefault()
                onFilterChange(key as FilterValue)
              }}
              >
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
