// Haut niveau
export interface IRover {
    avancer(): IEtatRover;
    reculer(): IEtatRover;
    tournerAGauche(): IEtatRover;
    tournerADroite(): IEtatRover;
}

export interface IEtatRover {
    getPositionX(): number;
    getPositionY(): number;
    getOrientation(): Orientation;
}

export enum Orientation {
     Nord,
     Sud,
     Est,
     Ouest
}
