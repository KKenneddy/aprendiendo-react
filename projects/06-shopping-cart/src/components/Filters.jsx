import { useId } from 'react'

import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Price a partir de:</label>
        <input
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categorías: </label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='smartphones'>Smartphones</option>
          <option value='laptops'>Laptops</option>
          <option value='fragrances'>Fragrances</option>
          <option value='skincare'>Skincare</option>
          <option value='groceries'>Groceries</option>
          <option value='home-decoration'>Home decoration</option>
        </select>
      </div>
    </section>
  )
}
