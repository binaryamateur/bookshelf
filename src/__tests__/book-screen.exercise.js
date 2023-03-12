// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

// 🐨 after each test, clear the queryCache and auth.logout
afterEach(async () => {
  queryCache.clear()
  await auth.logout()
})

test('renders all the book information', async () => {
  window.localStorage.setItem(auth.localStorageKey, 'myTestKey')
  const user = buildUser()
  const book = buildBook()
  window.history.pushState({}, 'fake book', `/book/${book.id}`)
  const originalFetch = window.fetch
  window.fetch = async (url, config) => {
    console.warn(url, config)
    if (url.includes('/bootstrap')) {
      return Promise.resolve({
        ok: true,
        json: async () => {
          return {user: {...user, token: 'myTestKey'}, listItems: []}
        },
      })
    } else if (url.includes(`/list-items`)) {
      return Promise.resolve({
        ok: true,
        json: async () => {
          return {listItems: []}
        },
      })
    } else if (url.includes(`/books/${book.id}`)) {
      return Promise.resolve({
        ok: true,
        json: async () => {
          return {
            book,
          }
        },
      })
    }
    return originalFetch(url, config)
  }
  render(<App />, {wrapper: AppProviders})
  await waitForElementToBeRemoved(() => screen.queryAllByLabelText(/loading/i))
  await waitForElementToBeRemoved(() => screen.queryAllByText(/loading/i))
  expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
  expect(screen.getByText(book.author)).toBeInTheDocument()
  expect(screen.getByText(book.publisher)).toBeInTheDocument()
  expect(screen.getByText(book.synopsis)).toBeInTheDocument()
  expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
    'src',
    book.coverImageUrl,
  )
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()

  expect(
    screen.queryByRole('button', {name: /remove from list/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as read/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', {name: /mark as unread/i}),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('textbox', {name: /notes/i}),
  ).not.toBeInTheDocument()
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
  screen.debug()
})
// 🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)

// 🐨 create a user using `buildUser`
// 🐨 create a book use `buildBook`
// 🐨 update the URL to `/book/${book.id}`
//   💰 window.history.pushState({}, 'page title', route)
//   📜 https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

// 🐨 reassign window.fetch to another function and handle the following requests:
// - url ends with `/bootstrap`: respond with {user, listItems: []}
// - url ends with `/list-items`: respond with {listItems: []}
// - url ends with `/books/${book.id}`: respond with {book}
// 💰 window.fetch = async (url, config) => { /* handle stuff here*/ }
// 💰 return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})

// 🐨 render the App component and set the wrapper to the AppProviders
// (that way, all the same providers we have in the app will be available in our tests)

// 🐨 use findBy to wait for the book title to appear
// 📜 https://testing-library.com/docs/dom-testing-library/api-async#findby-queries

// 🐨 assert the book's info is in the document
