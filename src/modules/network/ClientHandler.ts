import io, { Socket as ClientSocket } from 'socket.io-client';

export default class ClientHandler {
  private readonly _io: ClientSocket = io(`http://localhost:3000`);

  public onConnect(callback: Function) {
    this._io.on('connect', () => {
      callback();
    });
  }

  public onRoverResponse(callback: Function) {
    this._io.on('roverResponse', (response) => {
      callback({
        x: response.x,
        y: response.y,
        orientation: response.orientation
      })
    });
  }

  public sendObstacles(obstacles: {x: number; y: number}[]) {
    this._io.emit('setObstacles', obstacles);
  }

  public sendInstruction(instruction: string) {
    this._io.emit('sendInstruction', instruction);
  }
}