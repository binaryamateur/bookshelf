/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner} from 'components/lib'
import * as colors from './styles/colors.js'

const getUser = async () => {
  const token = await auth.getToken()
  let user = null
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  const {data, error, isIdle, isLoading, isSuccess, isError, run, setData} =
    useAsync({status: 'idle', data: null, error: null})
  const login = form => auth.login(form).then(u => setData(u))
  const register = form => auth.register(form).then(u => setData(u))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  React.useEffect(() => {
    run(getUser())
  }, [run])
  return isError ? (
    <div
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  ) : isIdle || isLoading ? (
    <FullPageSpinner />
  ) : data === null ? (
    <UnauthenticatedApp login={login} register={register} />
  ) : (
    <AuthenticatedApp user={data} logout={logout} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
