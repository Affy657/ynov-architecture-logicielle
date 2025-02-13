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

export enum Orientation {
     Nord,
     Sud,
     Est,
     Ouest
}
