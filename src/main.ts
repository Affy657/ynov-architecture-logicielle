import { io } from 'socket.io-client';
const socket = io("http://localhost:3000");
import './client';
import {RoverInterpreter} from "./roverInterpreter";
import {Rover} from "./rover";

const rover = new Rover({ x: 0, y: 0, orientation: 0 });
console.log(RoverInterpreter.interpreterCommands('a', rover))
console.log("Application démarrée...");
