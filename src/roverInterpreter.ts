import {Rover} from "./rover";
import Coord from "./coord";

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
    public static interpreterCommands(commands: string, rover: Rover): string {
        const initialPosition = { x: rover.getPositionX(), y: rover.getPositionY() };
        const commandsArray = commands.includes(' ')
            ? commands.split(' ')
            : [...commands];

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
                   console.log(`Commande inconnue: ${command}`);
            }
        }
        return 'Position initiale: ' + JSON.stringify(initialPosition) + ', Position finale: ' + JSON.stringify({ x: rover.getPositionX(), y: rover.getPositionY() });
    }
    public static setObstacles(obstacles: Coord[], rover: Rover): void {
        rover.setObstacles(obstacles);
    }
}
