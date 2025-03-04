import { IRover } from "./rover.interface";

/**
 * Classe interprète pour interpréter une séquence de commandes et exécuter les actions sur un Rover.
 * Cette classe permet d'exécuter des commandes sous forme de chaîne de caractères.
 */
export class RoverInterpreter {

    /**
     * Interprète une chaîne de commandes et fait exécuter les actions correspondantes au Rover.
     * @param {string} commands - La chaîne de commandes à interpréter.
     * @param {IRover} rover - L'instance du Rover sur lequel les commandes seront exécutées.
     */
    public static interpreterCommands(commands: string, rover: IRover): void {
        // If the commands contain spaces, split them into an array
        // If not, treat the entire string as a single continuous sequence of commands
        const commandsArray = commands.includes(' ')
            ? commands.split(' ')
            : [...commands]; // Spread the string into individual characters

        for (let command of commandsArray) {
            switch (command.toLowerCase()) {
                case 'a':
                    rover.avancer();
                    break;
                case 'r':
                    rover.reculer();
                    break;
                case 'g':
                    rover.tournerAGauche();
                    break;
                case 'd':
                    rover.tournerADroite();
                    break;
                default:
                    throw new Error(`Commande inconnue: ${command}`);
            }
        }
    }
}
