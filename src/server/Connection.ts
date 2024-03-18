import { Socket } from "socket.io";
import { MessageType } from '../general/messages';

let firstConnection: Connection | null = null;
let secondConnection: Connection | null = null;

export class Connection {
    socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    static create(socket: Socket): Connection {
        const connection = new Connection(socket);
        if (firstConnection) {
            secondConnection = connection;
            firstConnection.socket.emit(MessageType.START, {isFirst: true});
            secondConnection.socket.emit(MessageType.START, {isFirst: false});
            firstConnection?.socket.onAny((eventName: string, data: any) => {
                secondConnection?.socket.emit(eventName, data);
            });
            secondConnection?.socket.onAny((eventName: string, data: any) => {
                firstConnection?.socket.emit(eventName, data);
            });
        }
        else{
            firstConnection = connection;
        }
        return connection;
    }
}