import { RoverInterpreter } from "../src/roverInterpreter";
import { Rover } from "../src/rover";
import { Orientation } from "../src/rover.interface";
import { Map } from "../src/map";
import Coord from "../src/coord";

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

    const inputOptions: Rover.Options = {
        orientation: Orientation.Ouest,
        x: 0,
        y: 0,
        isunittest: true
    };

    test('Interpréter une séquence de commandes "a r g d" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        RoverInterpreter.interpreterCommands('a r g d', rover);
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes "argd" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        RoverInterpreter.interpreterCommands('argd', rover);
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes "a a g d" sur Rover', () => {
        const rover: Rover = new Rover(inputOptions);
        RoverInterpreter.interpreterCommands('a a g d', rover);
        const expectedOptions: Pos = { x: 8, y: 0, orientation: Orientation.Ouest };
        basicTest(rover, expectedOptions);
    });

    test('Interpréter une séquence de commandes avec des orientations multiples', () => {
        const rover: Rover = new Rover(inputOptions);
        RoverInterpreter.interpreterCommands('d d a g r', rover);
        const expectedOptions: Pos = { x: 1, y: 1, orientation: Orientation.Nord };
        basicTest(rover, expectedOptions);
    });

    test('Tester un rover qui se déplace vers un obstacle', () => {
        const map = new Map(10, 10, [new Coord(0, 1)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Sud, map: map, isunittest:true });
        RoverInterpreter.interpreterCommands('a a', rover);
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Sud };
        basicTest(rover, expectedOptions);
    });

    test('Essayer de déplacer un rover au bord de la carte', () => {
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord, map: new Map(10, 10), isunittest:true });
        RoverInterpreter.interpreterCommands('a a a a', rover);
        const expectedOptions: Pos = { x: 0, y: 6, orientation: Orientation.Nord };
        basicTest(rover, expectedOptions);
    });

    test('Vérifier qu\'une commande inconnue ne modifie pas l\'état du Rover et logge l\'erreur', () => {
        const rover: Rover = new Rover(inputOptions);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        expect(() => RoverInterpreter.interpreterCommands('a x r', rover)).not.toThrow();
        expect(consoleSpy).toHaveBeenCalledWith("Commande inconnue: x");
        consoleSpy.mockRestore();
    });

});
