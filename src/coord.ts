/**
 * Classe objet valeur.
 * Classe bas niveau.
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
    this._x = this.verifyCoord(x) ? x : this.normalize(x);
    this._y = this.verifyCoord(y) ? y : this.normalize(y);
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
   * Applique le modulo des coordonnées avec un autre ensemble de coordonnées.
   * @param {Coord} deltaCoord - Les coordonnées avec lesquelles calculer le modulo.
   */
  public modulo(deltaCoord: Coord): Coord {
    const moduloOperation = (num: number, mod: number) => {
      const valeurRéduiteSignée = (num % mod) % -mod;
      const valeurNonSignée = valeurRéduiteSignée + mod;
      return valeurNonSignée % mod;
    };

    const newX = moduloOperation(this._x, deltaCoord.x);
    const newY = moduloOperation(this._y, deltaCoord.y);

    return new Coord(newX, newY);
  }


  private normalize(coord: number) {
    return Math.abs(Math.round(coord));
  }

  private verifyCoord(coord: number) {
    if (!Number.isSafeInteger(coord)) {
      throw new Error("Coordonnée invalide, ces coordonnées doivent être des entiers positifs");
    }
    return true;
  }

  /**
   * Is coord equal to another coord
   * @param {Coord} coord - The coord to compare
   * @returns {boolean}
   */
  public equals(coord: Coord): boolean {
        return this._x === coord.x && this._y === coord.y;
  }

  /**
   * Crée une nouvelle instance de Coord à partir d'une autre instance de Coord.
   * @param coord - Les coordonnées à partir desquelles créer une nouvelle instance de Coord.
   * @returns {Coord}
   */
  public from(coord: Coord) {
        return new Coord(coord.x, coord.y);
  }
}
