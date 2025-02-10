import {IEtatRover, Orientation} from "../src/rover.interface";
import {Rover} from "../src/rover";

describe('Rover avance', () => {
    test('depuis 0,0,N', () => {
        const orientation = Orientation.Nord;
        const rover : Rover = new Rover(0, 0, orientation);

        const etat = rover.Avancer();

        expect(etat.GetPositionX()).toBe(0);
        expect(etat.GetPositionY()).toBe(1);
        expect(etat.GetOrientation()).toBe(orientation);
    });

    test('depuis 1,0,N', () => {
        const orientation = Orientation.Nord;
        const rover : Rover = new Rover(1, 0, orientation);

        const etat = rover.Avancer();

        expect(etat.GetPositionX()).toBe(1);
        expect(etat.GetPositionY()).toBe(1);
        expect(etat.GetOrientation()).toBe(orientation);
    })

    test('depuis 0,1,N', () => {
        const orientation = Orientation.Nord;
        const rover : Rover = new Rover(0, 1, orientation);

        const etat = rover.Avancer();

        expect(etat.GetPositionX()).toBe(0);
        expect(etat.GetPositionY()).toBe(2);
        expect(etat.GetOrientation()).toBe(orientation);
    })

    test('2 fois depuis 0,0,N', () => {
        const orientation = Orientation.Nord;
        const rover : Rover = new Rover(0, 0, orientation);

        const etat = rover.Avancer().Avancer();

        expect(etat.GetPositionX()).toBe(0);
        expect(etat.GetPositionY()).toBe(2);
        expect(etat.GetOrientation()).toBe(orientation);
    })

    test('Orientation', () => {
        type pos = {
            x: number,
            y: number,
            orientation: Orientation
        }
        const basicTest = (etat:IEtatRover, expectedOptions: pos)=>{
            expect(etat.GetPositionX(), 'etat.GetPositionX() test').toBe(expectedOptions.x);
            expect(etat.GetPositionY(), 'etat.GetPositionY() test').toBe(expectedOptions.y);
            expect(etat.GetOrientation(), 'etat.GetOrientation() test' ).toBe(expectedOptions.orientation);
        }
        const inputOptions : pos = {
            orientation: Orientation.West,
            x: 2,
            y: 2
        }
        it('TounerAGauche', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerAGauche();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite deux fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerAGauche();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite trois fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerAGauche().TournerAGauche();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Nord}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite quatre fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerAGauche().TournerAGauche().TournerAGauche();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.West}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite deux fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerADroite();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Est}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite trois fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerADroite().TournerADroite();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.Sud}
            basicTest(etat,expectedOptions);
        })
        it('TounerADroite quatre fois', () => {
            const rover : Rover = new Rover(inputOptions.x, inputOptions.y, inputOptions.orientation);
            const etat = rover.TournerADroite().TournerADroite().TournerADroite().TournerADroite();
            const expectedOptions : pos = {x: inputOptions.x, y: inputOptions.y, orientation: Orientation.West}
            basicTest(etat,expectedOptions);
        })
    })

})
