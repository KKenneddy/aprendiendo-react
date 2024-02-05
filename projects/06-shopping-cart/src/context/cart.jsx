import { createContext, useReducer } from 'react'
import { initialState, reducer, CART_ACTION_TYPES } from '../reducers/cart'

export const CartContext = createContext()

function useCartReducer () {
  const [cart, dispatch] = useReducer(reducer, initialState)

  const addToCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })
  }

  return { cart, addToCart, clearCart, removeFromCart }
}

export const CartProvider = ({ children }) => {
  const { cart, addToCart, clearCart, removeFromCart } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      clearCart,
      removeFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
