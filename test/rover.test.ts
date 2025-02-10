import {IEtatRover, Orientation} from "../src/rover.interface";
import {Rover} from "../src/rover";

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
});

