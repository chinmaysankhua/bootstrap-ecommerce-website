import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import AuthContext from './AuthContext'

const FIREBASE_URL =
  'https://react-ecommerce-project-3fc57-default-rtdb.firebaseio.com'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const { token, userId, isLoggedIn } =
    useContext(AuthContext)

  const getCartUrl = useCallback(
    (productId = '') => {
      return `${FIREBASE_URL}/users/${userId}/cart/${productId}.json?auth=${token}`
    },
    [userId, token]
  )

  const addToCart = useCallback(
    async (product) => {
      if (!isLoggedIn || !userId || !token) {
        return
      }

      const existingProduct = cart.find(
        (item) => item?.id === product.id
      )

      const updatedProduct = existingProduct
        ? {
            ...existingProduct,
            quantity:
              existingProduct.quantity + 1,
          }
        : {
            ...product,
            quantity: 1,
          }

      try {
        const response = await fetch(
          getCartUrl(product.id),
          {
            method: 'PUT',
            body: JSON.stringify(updatedProduct),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to save cart item'
          )
        }

        setCart((previousCart) => {
          const productExists =
            previousCart.some(
              (item) => item?.id === product.id
            )

          if (productExists) {
            return previousCart.map((item) =>
              item?.id === product.id
                ? updatedProduct
                : item
            )
          }

          return [
            ...previousCart.filter(
              (item) => item !== null
            ),
            updatedProduct,
          ]
        })
      } catch (error) {
        console.error(
          'Error adding item to cart:',
          error
        )
      }
    },
    [
      cart,
      getCartUrl,
      isLoggedIn,
      token,
      userId,
    ]
  )

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn || !userId || !token) {
      setCart([])
      return
    }

    try {
      const response = await fetch(
        `${FIREBASE_URL}/users/${userId}/cart.json?auth=${token}`
      )

      if (!response.ok) {
        throw new Error(
          'Failed to fetch cart'
        )
      }

      const data = await response.json()

      if (!data) {
        setCart([])
        return
      }

      const loadedCart = Object.values(data).filter(
        (item) =>
          item !== null &&
          item !== undefined
      )

      setCart(loadedCart)
    } catch (error) {
      console.error(
        'Error fetching cart:',
        error
      )
    }
  }, [isLoggedIn, token, userId])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (
        !isLoggedIn ||
        !userId ||
        !token ||
        quantity < 1
      ) {
        return
      }

      const existingProduct = cart.find(
        (item) => item?.id === productId
      )

      if (!existingProduct) {
        return
      }

      const updatedProduct = {
        ...existingProduct,
        quantity,
      }

      try {
        const response = await fetch(
          getCartUrl(productId),
          {
            method: 'PUT',
            body: JSON.stringify(updatedProduct),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to update quantity'
          )
        }

        setCart((previousCart) =>
          previousCart.map((item) =>
            item?.id === productId
              ? updatedProduct
              : item
          )
        )
      } catch (error) {
        console.error(
          'Error updating quantity:',
          error
        )
      }
    },
    [
      cart,
      getCartUrl,
      isLoggedIn,
      token,
      userId,
    ]
  )

  const removeFromCart = useCallback(
    async (productId) => {
      if (!isLoggedIn || !userId || !token) {
        return
      }

      try {
        const response = await fetch(
          getCartUrl(productId),
          {
            method: 'DELETE',
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to remove cart item'
          )
        }

        setCart((previousCart) =>
          previousCart.filter(
            (item) => item?.id !== productId
          )
        )
      } catch (error) {
        console.error(
          'Error removing cart item:',
          error
        )
      }
    },
    [
      getCartUrl,
      isLoggedIn,
      token,
      userId,
    ]
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider