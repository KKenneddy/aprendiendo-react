import { Products } from './components/Products'
import { Header } from './components/Header'
import { products as initialProducts } from './mocks/products.json'
import { Footer } from './components/Footer'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'

function App () {
  const { filterProducts, filters } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer filters={filters} />
    </CartProvider>
  )
}

export default App
