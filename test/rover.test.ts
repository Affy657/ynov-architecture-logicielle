import {IEtatRover, Orientation} from "../src/rover.interface";
import {Rover} from "../src/rover";
import { Map } from "../src/map";
import Coord from "../src/coord";

describe('Rover avance', () => {
    type Pos = {
        x: number;
        y: number;
        orientation: Orientation;
    };

    const basicTest = (etat: Rover, expectedOptions: Pos) => {
        expect(etat.GetPositionX()).toBe(expectedOptions.x);
        expect(etat.GetPositionY()).toBe(expectedOptions.y);
        expect(etat.GetOrientation()).toBe(expectedOptions.orientation);
    };

    const inputOptions: Pos = {
        orientation: Orientation.Ouest,
        x: 0,
        y: 0,
    };

    test('TournerAGauche', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerAGauche();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite deux fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite trois fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite quatre fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite().TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Ouest };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Nord };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite deux fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite trois fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('TournerADroite quatre fois', () => {
        const rover: Rover = new Rover(inputOptions);
        const etat = rover.TournerADroite().TournerADroite().TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Ouest };
        basicTest(etat, expectedOptions);
    });
    test('Avancer une fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Avancer();
        const expectedOptions : Pos = {x: 0, y: 1, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Avancer deux fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Avancer().Avancer();
        const expectedOptions : Pos = {x: 0, y: 2, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Avancer trois fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Avancer().Avancer().Avancer();
        const expectedOptions : Pos = {x: 0, y: 3, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Avancer quatre fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Avancer().Avancer().Avancer().Avancer();
        const expectedOptions : Pos = {x: 0, y: 4, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Reculer une fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Reculer();
        const expectedOptions : Pos = {x: 0, y: 9, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Reculer deux fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Reculer().Reculer();
        const expectedOptions : Pos = {x: 0, y: 8, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Reculer trois fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Reculer().Reculer().Reculer();
        const expectedOptions : Pos = {x: 0, y: 7, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Reculer quatre fois', () => {
        const rover : Rover = new Rover(inputOptions);
        const etat = rover.Reculer().Reculer().Reculer().Reculer();
        const expectedOptions : Pos = {x: 0, y: 6, orientation: Orientation.Ouest}
        basicTest(etat,expectedOptions);
    })

    test('Rover must throw an error when an obstacle detected', () => {
        const map = new Map(10, 10, [new Coord(0, 1)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Est, map: map });

        expect(() => {
            rover.Avancer();
        }).toThrow("Obstacle detected");
    })

    test('Avancer at the map edge (top)', () => {
        const rover: Rover = new Rover({ x: 0, y: 9, orientation: Orientation.Nord, map: new Map(10, 10) });
        const etat = rover.Avancer();
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Nord };
        basicTest(etat, expectedOptions);
    });

    test('Avancer at the map edge (right)', () => {
        const rover: Rover = new Rover({ x: 9, y: 0, orientation: Orientation.Est, map: new Map(10, 10) });
        const etat = rover.Avancer();
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Est };
        basicTest(etat, expectedOptions);
    });

    test('Avancer at the map edge (bottom)', () => {
        const rover: Rover = new Rover({ x: 0, y: 0, orientation: Orientation.Sud, map: new Map(10, 10) });
        const etat = rover.Avancer();
        const expectedOptions: Pos = { x: 0, y: 9, orientation: Orientation.Sud };
        basicTest(etat, expectedOptions);
    });

    test('Avancer at the map edge (left)', () => {
        const rover: Rover = new Rover({ x: 0, y: 0, orientation: Orientation.Ouest, map: new Map(10, 10) });
        const etat = rover.Avancer();
        const expectedOptions: Pos = { x: 9, y: 0, orientation: Orientation.Ouest };
        basicTest(etat, expectedOptions);
    });

    test('Avancer with multiple obstacles', () => {
        const map = new Map(10, 10, [new Coord(0, 1), new Coord(0, 2)]);
        const rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord, map: map });
        expect(() => rover.Avancer()).toThrow("Obstacle detected");
    });

    test('Reculer with obstacles blocking the way', () => {
        const map = new Map(10, 10, [new Coord(0, 8), new Coord(0, 9)]);
        const rover = new Rover({ x: 0, y: 9, orientation: Orientation.Sud, map: map });
        expect(() => rover.Reculer()).toThrow("Obstacle detected");
    });

    test('Trying to turn beyond the map bounds', () => {
        const rover: Rover = new Rover({ x: 0, y: 0, orientation: Orientation.Nord, map: new Map(10, 10) });
        const etat = rover.TournerADroite().TournerADroite().TournerADroite();
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Sud }; // Ensure Rover stays within bounds
        basicTest(etat, expectedOptions);
    });

    test('Avancer multiple times and reach the edge', () => {
        const rover: Rover = new Rover({ x: 0, y: 8, orientation: Orientation.Sud, map: new Map(10, 10) });
        const etat = rover.Avancer().Avancer();
        const expectedOptions: Pos = { x: 0, y: 0, orientation: Orientation.Sud }; // Assuming it goes out of bounds
        basicTest(etat, expectedOptions);
    });

    test('Obstacle in the middle of movement', () => {
        const map = new Map(10, 10, [new Coord(0, 5)]);
        const rover = new Rover({ x: 0, y: 4, orientation: Orientation.Nord, map: map });
        expect(() => rover.Avancer()).toThrow("Obstacle detected");
    });
});

