import { IEtatRover, Orientation } from "../src/rover.interface";
import { Rover } from "../src/rover";

describe('Rover avance', () => {
    type Pos = {
        x: number;
        y: number;
        orientation: Orientation;
    };

    const basicTest = (etat: IEtatRover, expectedOptions: Pos) => {
        expect(etat.GetPositionX()).toBe(expectedOptions.x);
        expect(etat.GetPositionY()).toBe(expectedOptions.y);
        expect(etat.GetOrientation()).toBe(expectedOptions.orientation);
    };

    const inputOptions: Pos = {
        orientation: Orientation.Ouest,
        x: 2,
        y: 2,
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
});
