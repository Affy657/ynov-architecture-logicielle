import {IEtatRover, IRover, Orientation} from "./rover.interface";
import {Map} from "./map";
import Coord from "./coord";
import {RoverServer} from "./server";

enum Order {
    Avancer = "Avancer",
    Reculer = "Reculer"
}

/**
 * Classe entité représentant un Rover.
 * Classe haut niveau.
 * @class
 * @classdesc Classe représentant un Rover.
 */
export class Rover implements IRover, IEtatRover {
    private _coord: Coord;
    private _orientation: Orientation;
    private readonly _map: Map;
    private _server: RoverServer | undefined;
    /**
     * Constructeur de la classe Rover.
     * Initialise un Rover avec des options spécifiques.
     * @param {Rover.Options} options - Les options pour configurer le Rover.
     * @param {number} options.x - La position X du Rover (optionnelle, valeur par défaut : 0).
     * @param {number} options.y - La position Y du Rover (optionnelle, valeur par défaut : 0).
     * @param {Orientation} options.orientation - L'orientation du Rover (optionnelle, valeur par défaut : Orientation.Nord).
     * @param {Map} options.map - La carte sur laquelle le Rover évolue (optionnelle, valeur par défaut : une carte 10x10).
     */
    constructor(options: Rover.Options) {
        options ??= {};
        options.x ??= 0;
        options.y ??= 0;
        options.isunittest ??= false;
        options.orientation ??= Orientation.Nord;
        this._map = options.map ?? new Map(10, 10);
        if ( this._map.isObstacle(new Coord(options.x, options.y))) {
            throw new Error("Rover cannot be placed on an obstacle");
        }
        this._coord = this._map.getNextCoord(new Coord(options.x, options.y));
        this._orientation = options.orientation;
        if(options.isunittest === false){
            this._server = new RoverServer(this);
            this._server.start();
        }
    }
    /**
     * Retourne la position X du Rover.
     * @returns {number} - La position X actuelle du Rover.
     */
    public getPositionX(): number {
        return this._coord.x;
    }
    /**
     * Retourne la position Y du Rover.
     * @returns {number} - La position Y actuelle du Rover.
     */
    public getPositionY(): number {
        return this._coord.y;
    }
    /**
     * Retourne l'orientation actuelle du Rover.
     * @returns {Orientation} - L'orientation actuelle du Rover.
     */
    public getOrientation(): Orientation {
        return this._orientation;
    }
    /**
     * Fait avancer le Rover dans sa direction actuelle.
     * @returns {this} - L'instance du Rover après avoir avancé.
     */
    public avancer(): Rover {
        this.move(Order.Avancer);
        return this;
    }
    /**
     * Fait reculer le Rover dans sa direction actuelle.
     * @returns {this} - L'instance du Rover après avoir reculé.
     */
    public reculer(): Rover {
        this.move(Order.Reculer);
        return this;
    }
    /**
     * Fait tourner le Rover à gauche de 90°.
     * @returns {this} - L'instance du Rover après avoir tourné à gauche.
     */
    public tournerAGauche(): Rover {
        const orientations = [
            Orientation.Nord,
            Orientation.Ouest,
            Orientation.Sud,
            Orientation.Est
        ];

        const currentIndex = orientations.indexOf(this.getOrientation());
        const newIndex = (currentIndex + 1) % orientations.length;

        this._orientation = orientations[newIndex];

        return this;
    }

    /**
     * Fait tourner le Rover à droite de 90°.
     * @returns {this} - L'instance du Rover après avoir tourné à droite.
     */
    public tournerADroite(): Rover {
        const orientations = [Orientation.Nord, Orientation.Est, Orientation.Sud, Orientation.Ouest];
        const currentIndex = orientations.indexOf(this.getOrientation());
        const nextIndex = (currentIndex + 1) % orientations.length;
        this._orientation = orientations[nextIndex];

        return this;
    }

    /**
     * Déplace le Rover selon son orientation actuelle et l'ordre (avancer ou reculer).
     * @param {Order} order - L'ordre d'action, soit "Avancer" ou "Reculer".
     */
    private move(order: Order) {
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
        const newCoord = new Coord(this._coord.x + deltaX, this._coord.y + deltaY);
        if (this._map.isObstacle(newCoord)) {
            return  this._coord;
        }
        this._coord= this._map.getNextCoord(newCoord);
    }
}
export namespace Rover {
    export type Options = {
        /**
         * La position X du Rover (optionnelle).
         * Si non spécifiée, la valeur par défaut est 0.
         */
        x?: number;
        /**
         * La position Y du Rover (optionnelle).
         * Si non spécifiée, la valeur par défaut est 0.
         */
        y?: number;
        /**
         * L'orientation initiale du Rover (optionnelle).
         * Si non spécifiée, la valeur par défaut est Orientation.Nord.
         */
        orientation?: Orientation;
        /**
         * La carte sur laquelle le Rover évolue (optionnelle).
         * Si non spécifiée, une carte de taille 10x10 sera utilisée par défaut.
         */
        map?: Map;
        isunittest?:boolean;
    }
}

