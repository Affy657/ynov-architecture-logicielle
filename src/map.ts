import {IMaps} from "./maps.interface";

export class Map implements IMaps {

    private readonly max_x: number;
    private readonly max_y: number;

    /**
     * Constructeur de la classe Map.
     * Initialise une carte avec les dimensions spécifiées.
     * @param {number} x - La largeur maximale de la carte.
     * @param {number} y - La hauteur maximale de la carte.
     */
    constructor(x: number, y: number) {
        this.max_x = x;
        this.max_y = y;
    }

    /**
     * Retourne la largeur maximale de la carte.
     * @returns {number} - La largeur maximale de la carte.
     */
    public GetMaxX(): number {
        return this.max_x;
    }

    /**
     * Retourne la hauteur maximale de la carte.
     * @returns {number} - La hauteur maximale de la carte.
     */
    public GetMaxY(): number {
        return this.max_y;
    }
}
