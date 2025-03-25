import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function sendInstructionToRover(instruction: string): void {
    socket.emit("sendInstruction", instruction);
}

socket.on("roverResponse", (response: string) => {
    alert("Réponse du rover: " + response);
});

document.getElementById("sendButton")?.addEventListener("click", () => {
    const instruction = (document.getElementById("instructionInput") as HTMLInputElement).value;
    if (instruction) {
        sendInstructionToRover(instruction);
    } else {
        alert('Veuillez entrer une instruction.');
    }
});
