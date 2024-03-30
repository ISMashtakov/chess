import { type Socket, io } from 'socket.io-client'

/**
 * Класс для взаимодействия с сетью
 */
export default class Network {
  socket: Socket

  constructor () {
    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    // FOR DEBUGGING
    this.socket.onAny((eventName: string, data: any) => { console.log('RECEIVED', eventName, data) })
    this.socket.onAnyOutgoing((eventName: string, data: any) => { console.log('SEND', eventName, data) })
  }
}
