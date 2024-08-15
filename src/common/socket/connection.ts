import { Socket, io } from 'socket.io-client';
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from './interface/chat.interface';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'https://messengerbackendweb-production.up.railway.app',
    {
        transports: ['websocket', 'polling'],
        reconnection: true,
    },
);

export default socket;
