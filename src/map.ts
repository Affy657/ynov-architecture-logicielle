import Coord from "./coord";

/**
 * Classe objet valeur.
 * Classe bas niveau.
 * Classe représentant une carte.
 * @class
 * @classdesc Classe représentant une carte.
 */
export class Map  {
    private readonly maxCoord: Coord;
    private readonly minCoord: Coord;
    private readonly obstacles: Coord[];

    /**
     * Constructeur de la classe Map.
     * Initialise une carte avec les dimensions spécifiées.
     * @param {number} x - La largeur maximale de la carte.
     * @param {number} y - La hauteur maximale de la carte.
     * @param {Coord[]?} obstacles - Les coordonnées des obstacles sur la carte (optionnel, valeur par défaut : []).
     */
    constructor(x: number, y: number, obstacles?: Coord[]) {
        this.maxCoord = new Coord(x, y);
        this.minCoord = new Coord(0, 0);
        this.obstacles = obstacles ?? [];
    }

    /**
     * Retourne la largeur maximale de la carte.
     * @returns {number} - La largeur maximale de la carte.
     */
    public getMaxX(): number {
        return this.maxCoord.x;
    }

    /**
     * Retourne la hauteur maximale de la carte.
     * @returns {number} - La hauteur maximale de la carte.
     */
    public getMaxY(): number {
        return this.maxCoord.y;
    }

    /**
     * Set next coord wrapping around the map
     * @param {Coord} coord - The current coord
     */
    public getNextCoord(coord: Coord) {
        let newCoord = coord.modulo(this.maxCoord);
        let newX = newCoord.x;
        let newY = newCoord.y;
        return new Coord(newX, newY);
    }

    public isObstacle(coord: Coord): boolean {
        return this.obstacles.some((obstacle) => obstacle.equals(coord));
    }
}
