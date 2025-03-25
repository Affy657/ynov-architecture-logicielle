import express, { type Express } from "express";
import { Server as SockerIOServer, type Socket } from "socket.io";
import cors from "cors";
import {
  createServer,
  type Server
} from 'http';
import Coord from "./coord";

export default class NetworkHandler {
  public static createServerHandler(): ServerHandler {
    return new ServerHandler();
  }
}

export class CommandFeedback {
  private readonly _socket: Socket;
  public readonly cmd: string;

  public constructor(socket: Socket, cmd: string) {
    this._socket = socket;
    this.cmd = cmd;
  }

  public feedback(pos: any) {
    this._socket.emit('roverResponse', pos);
  }
}

export class ServerHandler {
  private readonly _app: Express = express();
  private readonly _server: Server = createServer(this._app);
  private readonly _io: SockerIOServer = new SockerIOServer(this._server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['CONNECT'],
    }
  });
  private readonly events: { [key: string]: Function[] };

  public constructor() {
    this._app.use(cors());

    this.events = {
      commands: [],
      obstacles: []
    };

    this._io.on('connection', (socket) => {
      console.log('A client is connected');
      socket.on('sendInstruction', (instruction: string) => {
        console.log('Instruction received from client:', instruction);
        const cmdArray = instruction.includes(' ')
        ? instruction.split(' ')
        : [...instruction];

        for (const cmd of cmdArray) {
          this.emitCommand(new CommandFeedback(socket, cmd));
        }
      });

      socket.once('setObstacles', (obtacles: [{x: number, y: number}]) => {
        console.log('Obstacles received:', JSON.stringify(obtacles));
        this.emitObstacles(obtacles.map((obstacle) => new Coord(obstacle.x, obstacle.y)));
      });

      socket.once('disconnect', () => {
        console.log('A client is disconnected');
      });
    });

    this._server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  }

  public onCommand(callback: any) {
    this.events.commands.push(callback);
  }

  private emitCommand(cmd: CommandFeedback) {
    for (const callback of this.events.commands) {
      callback(cmd);
    }
  }

  public onObstacles(callback: any) {
    this.events.obstacles.push(callback);
  }

  private emitObstacles(obstacles: Coord[]) {
    for (const callback of this.events.obstacles) {
      callback(obstacles);
    }
  }
}