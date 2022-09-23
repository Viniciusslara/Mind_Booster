import { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState({
    userToken: null,
    uid: null,
  })

  const signIn = (userData) => {
    const { userToken, uid } = userData
    setUserData({
      userToken,
      uid,
    })
  }

  const signUp = (userData) => {
    const { userToken, uid } = userData
    setUserData({
      userToken,
      uid,
    })
  }

  const signOut = () => {
    setUserData({
      userToken: null,
      uid: null,
    })
  }

  return (
    <AuthContext.Provider value={{
      userData,
      signIn,
      signUp,
      signOut,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
