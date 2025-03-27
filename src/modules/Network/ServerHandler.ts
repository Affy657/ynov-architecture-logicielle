import { Server as SockerIOServer, Socket as ServerSocket } from 'socket.io';
import Coord from '../Geometrie/Coord';

export class CommandFeedback {
  private readonly _socket: ServerSocket;
  public readonly cmd: string;

  public constructor(socket: ServerSocket, cmd: string) {
    this._socket = socket;
    this.cmd = cmd;
  }

  public feedback(pos: any) {
    this._socket.emit('roverResponse', pos);
  }
}

export default class ServerHandler {
  private readonly _io: SockerIOServer = new SockerIOServer(process.env.SERVER_PORT as unknown as number, {
    cors: {
      origin: 'http://localhost:5174',
      methods: ['CONNECT'],
    }
  });
  private readonly events: { [key: string]: Function[] };

  public constructor() {
    this.events = {
      commands: [],
      obstacles: []
    };

    this._io.on('connection', (socket) => {
      console.log('A client is connected');
      socket.on('sendInstruction', (instruction: string) => {
        console.log('Instruction received from client:', instruction);

        for (const cmd of ServerHandler.decodeInstruction(instruction)) {
          this.emitCommand(new CommandFeedback(socket, cmd));
        }
      });

      socket.on('setObstacles', (obstacles: {x: number; y: number}[]) => {
        this.emitObstacles(obstacles.map((obs) => new Coord(obs.x, obs.y)));
      });

      socket.once('disconnect', () => {
        console.log('A client is disconnected');
      });
    });
  }
  
  public static decodeInstruction(instruction: string): string[] {
    return instruction.includes(' ')
      ? instruction.split(' ')
      : [...instruction];
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