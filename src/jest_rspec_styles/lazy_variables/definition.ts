/**
 * Definition of lazy variable.
 */
export default class Definition {
  private _name: string
  private _evaluator: () => any
  private _suiteId: string

  /**
   * Initialize
   * @param {string}   name      name of variable.
   * @param {Function} evaluator function of evaluation.
   * @param {string}   suiteId   id of suite.
   */
  constructor(name: string, evaluator: () => any, suiteId: string) {
    this._name = name;
    this._evaluator = evaluator;
    this._suiteId = suiteId;
  }

  /**
   * Get a name of variable.
   * @return {String} name of variable.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Get a id of suite.
   * @return {String} id of suite.
   */
  get suiteId(): string {
    return this._suiteId;
  }

  /**
   * Evaluate lazy variable.
   * @return {any} evaluated value.
   */
  eval(): any {
    return this._evaluator();
  }
}
