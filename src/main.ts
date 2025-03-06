import { io } from 'socket.io-client';

// Initialisation du client Socket.io
const socket = io("http://localhost:3000");

// Importation de la logique client spécifique
import './client';

// Autres initialisations ou logiques nécessaires
console.log("Application démarrée...");
