import Rover from '../Rover/rover';
import Coord from '../Geometrie/Coord';

/**
 * Classe interprète pour interpréter une séquence de commandes et exécuter les actions sur un Rover.
 * Cette classe permet d'exécuter des commandes sous forme de chaîne de caractères.
 */
export default class RoverInterpreter {
    private readonly _rover: Rover;

    constructor(rover: Rover) {
        this._rover = rover;
    }

    /**
     * Interprète une chaîne de commandes et fait exécuter les actions correspondantes au Rover.
     * @param {string} commands - La chaîne de commandes à interpréter.
     * @param {IRover} rover - L'instance du Rover sur lequel les commandes seront exécutées.
     */
    public interpreterCommands(cmd: string): object {
        switch (cmd.toLowerCase()) {
            case 'a':
                this._rover.avancer();
                break;
            case 'r':
                this._rover.reculer();
                break;
            case 'g':
                this._rover.tournerAGauche();
                break;
            case 'd':
                this._rover.tournerADroite();
                break;
            default:
                console.log(`Commande inconnue: ${cmd}`);
        }
        
        return {
            x: this._rover.getPositionX(),
            y: this._rover.getPositionY(),
            orientation: this._rover.getOrientation()
        };

    }
    
    public interpreterObstacle(obstacles: Coord[]): void {
      console.log('Obstacles received', obstacles);
      this._rover.setObstacles(obstacles);
    }
}
