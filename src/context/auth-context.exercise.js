import * as React from 'react'

const AuthContext = React.createContext()

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuth must be only called from inside AuthContext.Provider',
    )
  }
  return context
}

export {AuthContext, useAuth}
