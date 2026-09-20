import { createContext, useCallback, useState } from 'react'

const AuthContext = createContext({
  token: null,
  userId: null,
  email: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  const [userId, setUserId] = useState(
    localStorage.getItem('userId')
  )

  const [email, setEmail] = useState(
    localStorage.getItem('email')
  )

  const login = useCallback(
    (idToken, loggedInUserId, userEmail) => {
      localStorage.setItem('token', idToken)
      localStorage.setItem('userId', loggedInUserId)
      localStorage.setItem('email', userEmail)

      setToken(idToken)
      setUserId(loggedInUserId)
      setEmail(userEmail)
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')

    setToken(null)
    setUserId(null)
    setEmail(null)
  }, [])

  const contextValue = {
    token,
    userId,
    email,
    isLoggedIn: !!token,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext