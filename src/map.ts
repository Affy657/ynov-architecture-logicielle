
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
        return this.maxCoord.y;
    }

    /**
     * Set next coord wrapping around the map
     * @param {Coord} coord - The current coord
     */
    public setNextCoord(coord: Coord) {
        coord.modulo(this.maxCoord);
        let newX = (coord.x + this.maxCoord.x) % this.maxCoord.x;
        let newY = (coord.y + this.maxCoord.y) % this.maxCoord.y;

        if (coord.x < this.minCoord.x) {
          newX = coord.x + this.maxCoord.x;
        }
        if (coord.y < this.minCoord.y) {
          newY = coord.y + this.maxCoord.y;
        }
        if (coord.x >= this.maxCoord.x) {
          newX = coord.x - this.maxCoord.x;
        }
        if (coord.y >= this.maxCoord.y) {
          newY = coord.y - this.maxCoord.y;
        }
        coord.set(newX, newY);
        if (this.isObstacle(coord)) {
            throw new Error('Obstacle detected');
        }
    }

    private isObstacle(coord: Coord): boolean {
        return this.obstacles.some((obstacle) => obstacle.equals(coord));
    }
}
