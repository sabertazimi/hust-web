const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')
const process = require('node:process')
const bodyParser = require('body-parser')
const express = require('express')
const rateLimit = require('express-rate-limit')
const socketio = require('socket.io')

const PORT = process.env.PORT || 7777
const app = express()
const server = http.Server(app)
const io = socketio(server)

const dbData = { users: {} }
const sockets = []

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  rateLimit({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 5,
    message: 'You exceeded 100 requests in 12 hour limit!',
    headers: true,
  }),
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  )
  next()
})

app.post('/signup', (req, res) => {
  const { email, username, password } = req.body

  if (
    dbData.users.every(
      ({ email: _email, username: _username }) =>
        _email !== email && _username !== username,
    )
  ) {
    dbData.users.push({
      email,
      username,
      password,
      friends: ['sabertazimi'],
    })
    dbData.users = dbData.users.map((user) => {
      const { username: _username, friends: _friends } = user

      if (_username === 'sabertazimi') {
        _friends.push(username)

        return {
          ...user,
          friends: _friends,
        }
      }

      return user
    })
    fs.writeFileSync(
      path.resolve(__dirname, './db.json'),
      JSON.stringify(dbData),
      {
        encoding: 'utf8',
        flag: 'w+',
      },
    )

    res.json({
      status: 200,
      email,
      username,
      friends: ['sabertazimi'],
    })
  } else {
    res.json({
      status: 400,
      message: 'User already signed up !',
    })
  }
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  let username = ''
  let friends = []

  if (
    dbData.users.some(
      ({
        email: _email,
        username: _username,
        password: _password,
        friends: _friends,
      }) => {
        if (_email === email && _password === password) {
          username = _username
          friends = _friends
          return true
        }

        return false
      },
    )
  ) {
    res.json({
      status: 200,
      email,
      username,
      friends,
    })
  } else {
    res.json({
      status: 400,
      message: 'Error username or password !',
    })
  }
})

io.on('connection', (socket) => {
  const { username } = socket.handshake.query

  sockets.push({
    name: username,
    channel: socket,
  })

  socket.on(username, (chatMessage) => {
    const { to } = JSON.parse(chatMessage)

    sockets.forEach(({ name, channel }) => {
      if (name === to)
        channel.emit(to, chatMessage)
    })
  })
})

server.listen(PORT, () => {
  const data = fs.readFileSync(path.resolve(__dirname, './db.json'), {
    encoding: 'utf8',
    flag: 'a+',
  })

  dbData.users = JSON.parse(data).users

  // eslint-disable-next-line no-console -- CLI output.
  console.log(`Server is running at port '${PORT}' ...`)
})
