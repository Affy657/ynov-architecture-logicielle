import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import { RoverInterpreter } from "./roverInterpreter";
import { Rover } from "./rover";
import Coord from "./coord";

export class RoverServer {
    private _app: express.Express;
    private _server: http.Server;
    private _io: SocketIOServer;
    private _rover: Rover;

    constructor(rover: Rover) {
        this._app = express();
        this._server = http.createServer(this._app);
        this._io = new SocketIOServer(this._server, {
            cors: {
                origin: 'http://localhost:5174',
                methods: ['GET', 'POST'],
                allowedHeaders: ['Content-Type'],
            }
        });
        this._rover = rover;

        this._app.use(cors());
        this.setupSocketEvents();
    }

    // Méthode pour simuler l'envoi d'instructions au rover
    private sendToRover(instruction: string): object {
        console.log(`Envoi de l'instruction au rover: ${instruction}`);
        return RoverInterpreter.interpreterCommands(instruction, this._rover);
    }

    // Méthode pour configurer les événements Socket.IO
    private setupSocketEvents(): void {
        this._io.on("connection", (socket) => {
            console.log("Un client est connecté");
            socket.on("sendInstruction", (instruction: string) => {
                console.log(`Instruction reçue du client: ${instruction}`);
                const roverResponse = this.sendToRover(instruction);
                socket.emit("roverResponse", roverResponse);
                console.log(`Réponse envoyée au client: ${roverResponse}`);
            });

            socket.on("setObstacles", (obstacles: Coord[]) => {
                console.log("Obstacles reçus:", obstacles);
                RoverInterpreter.setObstacles(obstacles, this._rover);
            });

            socket.on("disconnect", () => {
                console.log("Un client s'est déconnecté");
            });
        });
    }

    public start(port: number = 3000): void {
        this._server.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    }
}
