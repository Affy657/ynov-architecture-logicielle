// client.js
import { io } from 'socket.io-client';
import Coord from "./coord";

// Logique de communication avec le serveur
const socket = io("http://localhost:3000");

// Fonction pour envoyer les obstacles au serveur
function setObstacles(obstacles: Coord[]): void {
    socket.emit("setObstacles", obstacles);
}

// Fonction pour envoyer des instructions au rover
function sendInstructionToRover(instruction: string): void {
    socket.emit("sendInstruction", instruction);
}

// Recevoir la réponse du rover
socket.on("roverResponse", (response: string) => {
    alert("Réponse du rover: " + response);
});

// Gérer l'événement de clic pour envoyer une instruction
document.getElementById("sendButton")?.addEventListener("click", () => {
    const instruction = (document.getElementById("instructionInput") as HTMLInputElement).value;
    if (instruction) {
        sendInstructionToRover(instruction);
    } else {
        alert('Veuillez entrer une instruction.');
    }
});
