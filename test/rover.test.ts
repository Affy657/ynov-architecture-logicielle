import {Orientation} from '../src/rover.interface';
import Rover, { type Options } from '../src/Rover';
import Map from '../src/modules/map';
import Coord from '../src/modules/coord';

describe('Rover avance', () => {
    type Pos = {
        x: number;
        y: number;
        orientation: Orientation;
    };

    const basicTest = (etat: Rover, expectedOptions: Options) => {
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

    test('tournerAGauche', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerAGauche();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite deux fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite trois fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite quatre fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite().tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Ouest };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Nord };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite deux fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite trois fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('tournerADroite quatre fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.tournerADroite().tournerADroite().tournerADroite().tournerADroite();
        const expectedOptions: Options = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Ouest };
        basicTest(etat, expectedOptions);
    });
    test('avancer une fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.avancer();
        const expectedOptions : Options = {x: 9, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('avancer deux fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.avancer().avancer();
        const expectedOptions : Options = {x: 8, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('avancer trois fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.avancer().avancer().avancer();
        const expectedOptions : Options = {x: 7, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('avancer quatre fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.avancer().avancer().avancer().avancer();
        const expectedOptions : Options = {x: 6, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('reculer une fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.reculer();
        const expectedOptions : Options = {x: 1, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('reculer deux fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.reculer().reculer();
        const expectedOptions : Options = {x: 2, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('reculer trois fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.reculer().reculer().reculer();
        const expectedOptions : Options = {x: 3, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('reculer quatre fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.reculer().reculer().reculer().reculer();
        const expectedOptions : Options = {x: 4, y: 0, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Rover must throw an error when an obstacle detected', () => {
        const map = new Map(10, 10, [new Coord(1, 0)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Est, map: map, isunittest:true });

        const positionY = rover.getPositionY();
        const positionX = rover.getPositionX();
        expect( rover.avancer().getPositionY()).toBe(positionY);
        expect( rover.getPositionX()).toBe(positionX);
    })

    test('avancer at the map edge (top)', () => {
        const rover: Rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord, map: new Map(10, 10), isunittest:true });
        const etat = rover.avancer();
        const expectedOptions: Options = { x: 0, y: 9, orientation: Orientation.Nord };
        basicTest(etat, expectedOptions);
    });

    test('avancer at the map edge (right)', () => {
        const rover: Rover = new Rover({ x: 9, y: 0, orientation: Orientation.Est, map: new Map(10, 10), isunittest:true });
        const etat = rover.avancer();
        const expectedOptions: Options = { x: 0, y: 0, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('avancer at the map edge (bottom)', () => {
        const rover: Rover = new Rover({ x: 0, y: 9, orientation: Orientation.Sud, map: new Map(10, 10), isunittest:true });
        const etat = rover.avancer();
        const expectedOptions: Options = { x: 0, y: 0, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('avancer at the map edge (left)', () => {
        const rover: Rover = new Rover({ x: 0, y: 0, orientation: Orientation.Ouest, map: new Map(10, 10), isunittest:true });
        const etat = rover.avancer();
        const expectedOptions: Options = { x: 9, y: 0, orientation: Orientation.Ouest};
        basicTest(etat, expectedOptions);
    });

    test('avancer with multiple obstacles', () => {
        const map = new Map(10, 10, [new Coord(0, 1), new Coord(0, 2)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Sud, map: map, isunittest:true });
        const positionY = rover.getPositionY();
        const positionX = rover.getPositionX();
        expect( rover.avancer().getPositionY()).toBe(positionY);
        expect( rover.getPositionX()).toBe(positionX);
    });

    test('reculer with obstacles blocking the way', () => {
        const map = new Map(10, 10, [new Coord(0, 9)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Sud, map: map, isunittest:true });
        const positionY = rover.getPositionY();
        const positionX = rover.getPositionX();
        expect( rover.reculer().getPositionY()).toBe(positionY);
        expect( rover.getPositionX()).toBe(positionX);
    });

    test('Instancier un rover sur un obstacle', () => {
        const map = new Map(10, 10, [new Coord(0, 8), new Coord(0, 9)]);
        expect(() =>  new Rover({ x: 0, y: 9, orientation: Orientation.Sud, map: map, isunittest: true })).toThrow("Rover cannot be placed on an obstacle");
    });

    test('reculer vers un obstacle en dehors de la map', () => {
        const map = new Map(10, 10, [new Coord(0, 10)]);
        const rover = new Rover({ x: 0, y: 8, orientation: Orientation.Sud, map: map, isunittest: true });
        expect(rover.reculer()).toBe(rover);
    });
});

