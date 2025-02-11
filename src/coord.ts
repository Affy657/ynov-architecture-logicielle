/**
 * Classe représentant des coordonnées.
 * @class
 * @classdesc Classe représentant des coordonnées.
 */
export default class Coord {
  private readonly _x: number;
  private readonly _y: number;

  /**
   * Constructeur de la classe Coord.
   * @param {number} x - La position X.
   * @param {number} y - La position Y.
   */
  constructor(x: number, y: number) {
    if (!Number.isSafeInteger(x) || !Number.isSafeInteger(y)) {
      throw new Error("Les coordonnées doivent être des entiers.");
    }

    this._x = x;
    this._y = y;
  }

  /**
   * Retourne la position X.
   * @returns {number} - La position X.
   */
  get x() {
    return this._x;
  }

  /**
   * Retourne la position Y.
   * @returns {number} - La position Y.
   */
  get y() {
    return this._y;
  }

  /**
   * Calcule le modulo des coordonnées avec un autre ensemble de coordonnées.
   * @param {Coord} deltaCoord - Les coordonnées avec lesquelles calculer le modulo.
   * @returns {Coord}
   */
  modulo(deltaCoord: Coord): Coord {
    return new Coord(this._x % deltaCoord.x, this._y % deltaCoord.y);
  }

  /**
   * Crée une nouvelle instance de Coord à partir d'une autre instance de Coord.
   * @param coord - Les coordonnées à partir desquelles créer une nouvelle instance de Coord.
   * @returns {Coord}
   */
  from(coord: Coord) {
    return new Coord(coord.x, coord.y);
  }
}