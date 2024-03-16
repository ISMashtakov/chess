import { Socket } from "socket.io";

let firstConnection : Connection | null = null;
let secondConnection : Connection | null = null;

export default class Connection{
    socket: Socket;
    constructor(socket: Socket){
        this.socket = socket;
    }

    static create(socket: Socket): Connection {
        const connection = new Connection(socket);
        if (firstConnection) {
            secondConnection = connection;
            firstConnection.socket.emit('start');
            secondConnection.socket.emit('start');
        }
        else{
            firstConnection = connection;
        }
        return connection;
    }
}