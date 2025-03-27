import RoverInterpreter from '../src/modules/Interpreter/roverInterpreter';
import Rover, { type Options } from '../src/modules/Rover/rover';
import { Orientation } from '../src/modules/Rover/rover.interface';
import Map from '../src/modules/Geometrie/Map';
import Coord from '../src/modules/Geometrie/Coord';
import ServerHandler from '../src/modules/Network/ServerHandler';

describe('RoverInterpreter tests', () => {
    type Pos = {
        x: number;
        y: number;
        orientation: Orientation;
    };

    const basicTest = (etat: Rover, expectedOptions: Pos) => {
        expect(etat.getPositionX()).toBe(expectedOptions.x);
        expect(etat.getPositionY()).toBe(expectedOptions.y);
        expect(etat.getOrientation()).toBe(expectedOptions.orientation);
    };

    const inputOptions: Options = {
        orientation: Orientation.Ouest,
        x: 0,
        y: 0,
        isunittest: true
    };

    test('Interpréter une séquence de commandes "a r g d" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        const roverInterpreter = new RoverInterpreter(rover);
        roverInterpreter.interpreterCommands('a r g d');
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes "argd" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        const roverInterpreter = new RoverInterpreter(rover);
        roverInterpreter.interpreterCommands('argd');
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes "a a g d" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        const roverInterpreter = new RoverInterpreter(rover);
        const instructions = ServerHandler.decodeInstruction('a a g d')
        instructions.forEach(roverInterpreter.interpreterCommands.bind(roverInterpreter));
        const expectedOptions: Pos = { x: 8, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes avec des orientations multiples', () => {
        const rover: Rover = new Rover(inputOptions);
        const roverInterpreter = new RoverInterpreter(rover);
        const instructions = ServerHandler.decodeInstruction('d d a g r');
        instructions.forEach(instruction => roverInterpreter.interpreterCommands(instruction));
        const expectedOptions: Pos = { x: 1, y: 1, orientation: Orientation.Nord };
        basicTest(rover, expectedOptions);
    });

    test('Tester un Rover qui se déplace vers un obstacle', () => {
        const map = new Map(10, 10, [new Coord(0, 1)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Sud, map: map, isunittest:true });
        const roverInterpreter = new RoverInterpreter(rover);
        const instructions = ServerHandler.decodeInstruction('a a');
        instructions.forEach(instruction => roverInterpreter.interpreterCommands(instruction));
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Sud };
        basicTest(rover, expectedOptions);
    });

    test('Essayer de déplacer un Rover au bord de la carte', () => {
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord, map: new Map(10, 10), isunittest:true });
        const roverInterpreter = new RoverInterpreter(rover);
        const instructions = ServerHandler.decodeInstruction('a a a a');
        instructions.forEach(instruction => roverInterpreter.interpreterCommands(instruction));
        const expectedOptions: Pos = { x: 0, y: 6, orientation: Orientation.Nord };
        basicTest(rover, expectedOptions);
    });

    test('Vérifier qu\'une commande inconnue ne modifie pas l\'état du Rover et logge l\'erreur', () => {
        const rover: Rover = new Rover(inputOptions);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const roverInterpreter = new RoverInterpreter(rover);
        expect(() => roverInterpreter.interpreterCommands('x')).not.toThrow();
        expect(consoleSpy).toHaveBeenCalledWith("Commande inconnue: x");
        consoleSpy.mockRestore();
    });

});
