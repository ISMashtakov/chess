import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { Connection } from './Connection'
const app = express()
const httpServer = new http.Server(app)
const IOServer = new Server(httpServer)

const ROOT_PATH = path.resolve('.', '../../')
const PUBLIC_PATH = path.join(ROOT_PATH, 'public')

app.use(express.static(PUBLIC_PATH))

app.get('/', (request, responce) => {
  responce.sendFile(path.join(PUBLIC_PATH, 'index.html'))
})

httpServer.listen(80, () => {
  // eslint-disable-next-line no-undef
  console.log('SERVER START')
})

IOServer.on('connection', (socket) => {
  Connection.create(socket)
})
