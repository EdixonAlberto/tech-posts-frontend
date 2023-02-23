const jsonServer = require('json-server')
const { resolve } = require('path')

const PORT = 3000
const server = jsonServer.create()
const router = jsonServer.router(resolve('json-server', 'db.json'))
// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
server.post('/api/auth', (_req, res) => {
  res.jsonp({
    accessToken: '1234',
    user: {
      _id: 1,
      username: 'ratione',
      name: 'Kaley',
      surname: 'Bradtke',
      role: 'admin',
      createdAt: '2023-02-23T01:57:34.648Z',
      updatedAt: '2023-02-23T01:57:34.648Z'
    }
  })
})

server.post('/api/users', (_req, res) => {
  res.jsonp({})
})

server.use('/api', router)

server.listen(PORT, () => {
  console.log(`JSON Server is running in port ${PORT}`)
})
