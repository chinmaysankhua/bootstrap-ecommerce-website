import { createContext, useState } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.title === product.title
      )

      if (existingProduct) {
        return previousCart.map((item) =>
          item.title === product.title
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (indexToRemove) => {
    setCart((previousCart) =>
      previousCart.filter(
        (_, index) => index !== indexToRemove
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider