import JestTracker from './jest_tracker';
import Definition from './lazy_variables/definition';

/**
 * Lazy Variable.
 */
export default class LazyVariable {
  private _definitions: Array<Definition> = [];
  private _caches: any;
  private _tracker: JestTracker;

  /**
   * Initialize.
   * @param {JestTracker} tracker tracker of jest
   */
  constructor(tracker: JestTracker) {
    this._tracker = tracker;
    this.reset();
  }

  /**
   * Reset status.
   */
  reset(): void {
    this._caches = {};
  }

  /**
   * Create lazy variable.
   * @param {string}   name      name of variable.
   * @param {Function} evaluator function of variable evaluator. (If omit, get lazy variable.)
   * @return {Object} evaluated value.
   */
  lazy(name: string, evaluator?: () => any): any {
    const suite = this._tracker.getCurrentSuite();

    if (evaluator) {
      this._definitions.push(new Definition(name, evaluator, suite.id));
      return;
    }

    const cache = this._caches[name];
    if (cache) {
      return cache;
    }

    let cursor = suite;
    while (cursor) {
      const definition = this._definitions.find((d) => d.suiteId == cursor.id && d.name == name);
      if (definition) {
        const value = definition.eval();
        this._caches[name] = value;
        return value;
      }
      cursor = cursor.parentSuite;
    }

    throw new Error(`lazy('${name}') is not defined.`);
  }

  /**
   * Create subject of test.
   * @param {Function} evaluator function of variable evaluator. (If omit, get lazy variable.)
   * @return {Object} evaluated value.
   */
  subject(evaluator?: () => any): any {
    return this.lazy('subject', evaluator);
  }
}
