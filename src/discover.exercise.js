/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import {FaTimes} from 'react-icons/fa'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors.js'

function DiscoverBooksScreen() {
  // const [status, setStatus] = React.useState('idle')
  // const [data, setData] = React.useState(null)
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)

  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  // in an event handler/effect/wherever
  // run(doSomethingThatReturnsAPromise())

  React.useEffect(() => {
    if (!queried) {
      return
    }
    console.log(query)
    // setStatus('loading')
    // client(`books?query=${encodeURIComponent(query)}`)
    //   .then(data => {
    //     console.log(data)
    //     setData(data)
    //     setStatus('success')
    //   })
    //   .catch(err => {
    //     setStatus('failure')
    //     setData(err.message)
    //   })
    run(client(`books?query=${encodeURIComponent(query)}`))
  }, [queried, query, run])

  // const isLoading = status === 'loading'
  // const isSuccess = status === 'success'
  // const isError = status === 'failure'

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target[0].value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : isLoading ? (
                <Spinner />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
