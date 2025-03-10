import { io } from 'socket.io-client';

// Logique de communication avec le serveur
const socket = io("http://localhost:3000");

// Fonction pour envoyer des instructions au serveur (rover)
function sendInstructionToRover(instruction: string): void {
    socket.emit("sendInstruction", instruction);
}

// Recevoir la réponse du serveur (rover)
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
