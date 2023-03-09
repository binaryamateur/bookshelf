// 🐨 you'll need to import react and createRoot from react-dom up here

import React from 'react'
import ReactDOMClient from 'react-dom/client'
import {Logo} from 'components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

// 🐨 you'll also need to import the Logo component from './components/logo'

const LoginForm = ({type}) => {
  const handleSubmit = e => {
    e.preventDefault()

    console.log({username: e.target[0].value, password: e.target[1].value})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="off" />
      </div>
      <button type="submit">{type}</button>
    </form>
  )
}

const App = () => {
  const [showDialog, setShowDialog] = React.useState('none')
  const login = () => setShowDialog('login')
  const register = () => setShowDialog('register')
  const close = () => setShowDialog('none')
  return (
    <>
      <Logo height="80" width="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={login}>Login</button>
      </div>
      <Dialog
        aria-label="Login Modal"
        isOpen={showDialog === 'login'}
        onDismiss={close}
      >
        <button className="close-button" onClick={close}>
          Close
        </button>
        <h2>Login</h2>
        <LoginForm type={'Login'} />
      </Dialog>
      <div>
        <button onClick={register}>Register</button>
      </div>
      <Dialog
        aria-label="Register Modal"
        isOpen={showDialog === 'register'}
        onDismiss={close}
      >
        <button className="close-button" onClick={close}>
          Close
        </button>
        <h2>Register</h2>
        <LoginForm type={'Register'} />
      </Dialog>
    </>
  )
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<App />)
