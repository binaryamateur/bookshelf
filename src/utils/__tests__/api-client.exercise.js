// 🐨 you'll need the test server
// 💰 the way that our tests are set up, you'll find this in `src/test/server/test-server.js`
import {server, rest} from 'test/server'
import {client} from 'utils/api-client'
const apiURL = process.env.REACT_APP_API_URL
// 🐨 grab the client
// import {client} from '../api-client'

beforeAll(() => {
  server.listen()
})
afterAll(() => {
  server.close()
})

afterEach(() => {
  server.resetHandlers()
})

// 🐨 flesh these out:

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const data = await client(endpoint)
  expect(data).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  // 🐨 create a fake token (it can be set to any string you want)
  const endpoint = 'test-endpoint'
  const fakeToken = 'myFakeToken'
  const mockResult = {mockValue: 'VALUE'}
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {token: fakeToken})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`)
})
test('allows for config overrides', async () => {
  const endpoint = 'test-endpoint'
  const fakeToken = 'myFakeToken'
  const customConfig = {
    mode: 'cors',
    headers: {
      myHeader: 'MYHEADER',
    },
  }
  const mockResult = {mockValue: 'VALUE'}
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {token: fakeToken, ...customConfig})
  expect(request.headers.get('myHeader')).toBe('MYHEADER')
  expect(request['mode']).toBe('cors')
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  let request
  const data = {
    customData: 'MyCustomData',
  }
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {data: data})
  expect(request.body).toEqual(data)
})
