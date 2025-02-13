
import Coord from "./coord";

/**
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
    public GetMaxX(): number {
        return this.maxCoord.x;
    }

    /**
     * Retourne la hauteur maximale de la carte.
     * @returns {number} - La hauteur maximale de la carte.
     */
    public GetMaxY(): number {
        return this.minCoord.y;
    }

    /**
     * Get next coord wrapping around the map
     * @param {Coord} coord - The current coord
     * @returns {Coord}
     */
    public getNextCoord(coord: Coord) {
        let newCoord = coord.modulo(this.maxCoord);
        let newX = newCoord.x;
        let newY = newCoord.y;

        if (newCoord.x < this.minCoord.x) {
          newX = newCoord.x + this.maxCoord.x;
        }
        if (newCoord.y < this.minCoord.y) {
          newY = newCoord.y + this.maxCoord.y;
        }

        if (newCoord.x > this.maxCoord.x) {
          newX = newCoord.x - this.maxCoord.x;
        }

        if (newCoord.y > this.maxCoord.y) {
          newY = newCoord.y - this.maxCoord.y;
        }

        return new Coord( newX, newY);
    }

    isObstacle(coord: Coord): boolean {
        return this.obstacles.some((obstacle) => obstacle.equals(coord));
    }

    isObstacle(coord: Coord): boolean {
        return this.obstacles.some((obstacle) => obstacle.equals(coord));
    }
}
