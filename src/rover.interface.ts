export interface IRover {
    Avancer(): IEtatRover;
    Reculer(): IEtatRover;
    TournerAGauche(): IEtatRover;
    TournerADroite(): IEtatRover;
}

export interface IEtatRover {
    GetPositionX(): number;
    GetPositionY(): number;
    GetOrientation(): Orientation;
}

export abstract class Orientation {
    static readonly Nord: Orientation;
    static readonly Sud: Orientation;
    static readonly Est: Orientation;
    static readonly Ouest: Orientation;
}