import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './icons'
import './Cart.css'
import { useCart } from '../hooks/useCart'

export function Cart () {
  const cartChexkBoxId = useId()
  const {
    cart,
    addToCart,
    clearCart
  } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartChexkBoxId}>
        <CartIcon />
      </label>
      <input type='checkbox' hidden id={cartChexkBoxId} />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>

              <footer>
                <small>
                  Qty: {product.quantity}
                </small>
                <button onClick={() => addToCart(product)}>+</button>
              </footer>
            </li>
          ))}

        </ul>

        <button onClick={() => clearCart()}><ClearCartIcon /></button>
      </aside>
    </>
  )
}
