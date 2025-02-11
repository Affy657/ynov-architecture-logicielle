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
        this._x = options.x ?? 0;
        this._y = options.y ?? 0;
        this._orientation = options.orientation ?? Orientation.Nord;
        this._map = options.map ?? new Map(10, 10);
        this.max_x = this._map.GetMaxX();
        this.max_y = this._map.GetMaxY();
    }
    /**
     * Retourne la position X du Rover.
     * @returns {number} - La position X actuelle du Rover.
     */
    public GetPositionX(): number {
        return this._x;
    }
    /**
     * Retourne la position Y du Rover.
     * @returns {number} - La position Y actuelle du Rover.
     */
    public GetPositionY(): number {
        return this._y;
    }
    /**
     * Retourne l'orientation actuelle du Rover.
     * @returns {Orientation} - L'orientation actuelle du Rover.
     */
    public GetOrientation(): Orientation {
        return this._orientation;
    }
    /**
     * Fait avancer le Rover dans sa direction actuelle.
     * @returns {Rover} - L'instance du Rover après avoir avancé.
     */
    public Avancer(): Rover {

        const coordinate = this.move(this._x, this._y, Order.Avancer);

        this._x = coordinate.x;
        this._y = coordinate.y;

        return this;
    }
    /**
     * Fait reculer le Rover dans sa direction actuelle.
     * @returns {Rover} - L'instance du Rover après avoir reculé.
     */
    public Reculer(): Rover {

        const coordinate = this.move(this._x, this._y, Order.Reculer);

        this._x = coordinate.x;
        this._y = coordinate.y;

        return this;
    }
    /**
     * Fait tourner le Rover à gauche de 90°.
     * @returns {Rover} - L'instance du Rover après avoir tourné à gauche.
     */
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
    /**
     * Déplace le Rover selon son orientation actuelle et l'ordre (avancer ou reculer).
     * @param {number} x - La position X actuelle du Rover.
     * @param {number} y - La position Y actuelle du Rover.
     * @param {Order} order - L'ordre d'action, soit "Avancer" ou "Reculer".
     * @returns {{x: number, y: number}} - La nouvelle position du Rover après déplacement.
     */
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
    /**
     * Gère les bordures de la carte et ajuste les coordonnées du Rover.
     * @param {number} x - La nouvelle position X du Rover.
     * @param {number} y - La nouvelle position Y du Rover.
     * @returns {{x: number, y: number}} - La position ajustée en tenant compte de la bordure de la carte.
     */
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
    }
}

