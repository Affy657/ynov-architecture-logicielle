/**
 * Classe représentant des coordonnées.
 * @class
 * @classdesc Classe représentant des coordonnées.
 */
export default class Coord {
  private _x: number;
  private _y: number;

  /**
   * Constructeur de la classe Coord.
   * @param {number} x - La position X.
   * @param {number} y - La position Y.
   */
  constructor(x: number, y: number) {
    this.set(x, y);
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
  public modulo(deltaCoord: Coord): Coord {
    return new Coord(this._x % deltaCoord.x, this._y % deltaCoord.y);
  }

  public set(x: number, y:number) {
    this._x = this.verifyCoord(x) ? x : this.normalize(x);
    this._y = this.verifyCoord(y) ? y : this.normalize(y);
  }

  private normalize(coord: number) {
    return Math.abs(Math.round(coord));
  }

  private verifyCoord(coord: number) {
    if (!Number.isSafeInteger(coord)){
      console.log("Coordonnée invalide, ces coordennées doivent être des entiers positifs");
    }
    return Number.isSafeInteger(coord);
  }
}
