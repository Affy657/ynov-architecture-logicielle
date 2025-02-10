import {IEtatRover, IRover, Orientation} from "./rover.interface";

export class Rover implements IRover, IEtatRover {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number, orientation: Orientation) {
        this._x = x;
        this._y = y;
    }

    GetPositionX(): number {
        return this._x;
    }

    GetPositionY(): number {
        return this._y + 1;
    }

    GetOrientation(): Orientation {
        return Orientation.Nord;
    }

    Avancer(): IEtatRover {
        return this;
    }

    Reculer(): IEtatRover {
        throw new Error("Method not implemented.");
    }

    TournerAGauche(): IEtatRover {
        throw new Error("Method not implemented.");
    }

    TournerADroite(): IEtatRover {
        throw new Error("Method not implemented.");
    }
}