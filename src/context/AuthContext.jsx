import { createContext, useCallback, useState } from 'react'

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  const login = useCallback((idToken) => {
    localStorage.setItem('token', idToken)
    setToken(idToken)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
  }, [])

  const contextValue = {
    token,
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