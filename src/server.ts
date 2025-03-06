import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";  // Importer le middleware CORS
import { IRover } from "./rover.interface";
import { RoverInterpreter } from "./roverInterpreter";

// Définition de la classe qui gère le serveur
export class RoverServer {
    private _app: express.Express;
    private _server: http.Server;
    private _io: SocketIOServer;
    private _rover: IRover;

    constructor(rover: IRover) {
        // Initialisation de l'application Express et du serveur HTTP
        this._app = express();
        this._server = http.createServer(this._app);
        this._io = new SocketIOServer(this._server, {
            cors: {
                origin: 'http://localhost:5175', // Spécifiez l'origine du client ici
                methods: ['GET', 'POST'],
                allowedHeaders: ['Content-Type'],
            }});
        this._rover = rover;

        this._app.use(cors());

        // Configurer les événements Socket.IO
        this.setupSocketEvents();
    }

    // Méthode pour simuler l'envoi d'instructions au rover
    private sendToRover(instruction: string): void {
        // Ici vous pouvez implémenter l'interaction avec le rover
        console.log(`Envoi de l'instruction au rover: ${instruction}`);
        RoverInterpreter.interpreterCommands(instruction, this._rover);
    }

    // Méthode pour configurer les événements Socket.IO
    private setupSocketEvents(): void {
        this._io.on("connection", (socket) => {
            console.log("Un client est connecté");

            // Écouter les instructions envoyées par le client
            socket.on("sendInstruction", (instruction: string) => {
                console.log(`Instruction reçue du client: ${instruction}`);
                // Appel de la fonction pour envoyer au rover
                const roverResponse = this.sendToRover(instruction);
                // Répondre au client avec la réponse du rover
                socket.emit("roverResponse", roverResponse);
            });

            // Gérer la déconnexion du client
            socket.on("disconnect", () => {
                console.log("Un client s'est déconnecté");
            });
        });
    }

    // Méthode pour démarrer le serveur
    public start(port: number = 3000): void {
        this._server.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    }
}
