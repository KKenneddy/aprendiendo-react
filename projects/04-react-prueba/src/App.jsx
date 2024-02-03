import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, refreshRandomCat } = useCatFact()
  const { img } = useCatImage({ fact })

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={refreshRandomCat}>Refresh</button>
      {fact && <p>{fact}</p>}
      {img && <img src={img} alt={fact} />}
    </main>
  )
}
