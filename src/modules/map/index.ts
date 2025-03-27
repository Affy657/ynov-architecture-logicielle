import Coord from '../coord';

/**
 * Classe objet valeur.
 * Classe bas niveau.
 * Classe représentant une carte.
 * @class
 * @classdesc Classe représentant une carte.
 */
export default class Map {
    private _maxCoord: Coord;
    private _minCoord: Coord;
    private _obstacles: Coord[];

    /**
     * Constructeur de la classe Map.
     * Initialise une carte avec les dimensions spécifiées.
     * @param {number} x - La largeur maximale de la carte.
     * @param {number} y - La hauteur maximale de la carte.
     * @param {Coord[]?} obstacles - Les coordonnées des obstacles sur la carte (optionnel, valeur par défaut : []).
     */
    constructor(x: number, y: number, obstacles?: Coord[]) {
        this._maxCoord = new Coord(x, y);
        this._minCoord = new Coord(0, 0);
        this._obstacles = obstacles ?? [];
    }

    /**
     * Retourne la largeur maximale de la carte.
     * @returns {number} - La largeur maximale de la carte.
     */
    public getMaxX(): number {
        return this._maxCoord.x;
    }

    /**
     * Retourne la hauteur maximale de la carte.
     * @returns {number} - La hauteur maximale de la carte.
     */
    public getMaxY(): number {
        return this._maxCoord.y;
    }

    /**
     * Set next coord wrapping around the map
     * @param {Coord} coord - The current coord
     */
    public getNextCoord(coord: Coord) {
        const newCoord = coord.modulo(this._maxCoord);
        return newCoord;
    }

    public isObstacle(coord: Coord): boolean {
        return this._obstacles.some((obstacle) => obstacle.equals(coord));
    }

    public setObstacles(coord: Coord[]): void {
        this._obstacles = coord;
    }

    public getObstacles(): Coord[] {
        return this._obstacles;
    }
}
