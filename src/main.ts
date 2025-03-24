import { io } from 'socket.io-client';
const socket = io("http://localhost:3000");
import './client';
console.log("Application démarrée...");
