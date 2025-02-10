import {IEtatRover, IRover, Orientation} from "./rover.interface";
import {Map} from "./map";

enum Order { 
    Avancer = "Avancer",
    Reculer = "Reculer"
}

export class Rover implements IRover, IEtatRover {
    private _x: number;
    private _y: number;
    private _orientation: Orientation;
    private readonly _map: Map;
    private readonly max_x: number;
    private readonly max_y: number;

    constructor(options: Rover.Options) {
        this._x = options.x ?? 0;
        this._y = options.y ?? 0;
        this._orientation = options.orientation ?? Orientation.Nord;
        this._map = options.map ?? new Map(10, 10);
        this.max_x = this._map.GetMaxX();
        this.max_y = this._map.GetMaxY();
    }

    public GetPositionX(): number {
        return this._x;
    }

    public GetPositionY(): number {
        return this._y;
    }

    public GetOrientation(): Orientation {
        return this._orientation;
    }

    public Avancer(): Rover {

        const coordinate = this.move(this._x, this._y, Order.Avancer);

        this._x = coordinate.x;
        this._y = coordinate.y;

        return this;
    }

    public Reculer(): Rover {

        const coordinate = this.move(this._x, this._y, Order.Reculer);

        this._x = coordinate.x;
        this._y = coordinate.y;

        return this;
    }

    public TournerAGauche(): Rover {

        if (this.GetOrientation() === Orientation.Nord) {
                this._orientation = Orientation.Ouest;
            }
        else if (this.GetOrientation() === Orientation.Ouest) {
                this._orientation = Orientation.Sud;
            }
        else if (this.GetOrientation() === Orientation.Sud) {
                this._orientation = Orientation.Est;
            }
        else if (this.GetOrientation() === Orientation.Est) {
                this._orientation = Orientation.Nord;
            }
        return this;
    }

    public TournerADroite(): Rover {

        if (this.GetOrientation() === Orientation.Nord) {
            this._orientation = Orientation.Est;
        }
        else if (this.GetOrientation() === Orientation.Est) {
            this._orientation = Orientation.Sud;
        }
        else if (this.GetOrientation() === Orientation.Sud) {
            this._orientation = Orientation.Ouest;
        }
        else if (this.GetOrientation() === Orientation.Ouest) {
            this._orientation = Orientation.Nord;
        }
        return this;
    }

    private move(x: number, y: number, order: Order): { x: number, y: number } {
        let deltaX = 0;
        let deltaY = 0;

        switch (this._orientation) {
            case Orientation.Nord :
                deltaY = (order === Order.Avancer) ? 1 : -1;
                break;
            case Orientation.Sud:
                deltaY = (order === Order.Avancer) ? -1 : 1;
                break;
            case Orientation.Est:
                deltaX = (order === Order.Avancer) ? 1 : -1;
                break;
            case Orientation.Ouest:
                deltaX = (order === Order.Avancer) ? -1 : 1;
                break;
        }

        return this.wrapAround( x + deltaX, y + deltaY );
    }

    private wrapAround(x: number, y: number): { x: number, y: number } {
        let newX = x % this.max_x;
        let newY = y % this.max_y;

        if (newX < 0) {
            newX += this.max_x;
        }
        if (newY < 0) {
            newY += this.max_y;
        }
        if (newX > this.max_x) {
            newX -= this.max_x;
        }
        if (newY > this.max_y) {
            newY -= this.max_y;
        }

        return { x: newX, y: newY };
    }
}
export namespace Rover {
    export type Options = {
        x?: number;
        y?: number;
        orientation?: Orientation;
        map?: Map;
    }
}
