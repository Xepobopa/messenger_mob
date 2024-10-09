import { Socket, io } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './interface/chat.interface';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://10.0.2.2:3002/chat',
  {
    transports: ['websocket', 'polling'],
    reconnection: true,
  },
);

export default socket;
