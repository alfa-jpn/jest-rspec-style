/**
 * Tracker of jest status.
 */
export default class JestTracker {
  private _currentSpec: jasmine.Spec | null = null

  /**
   * Initialize trakcer.
   */
  constructor() {
    this._createEventHooks();
  }

  /**
   * Get current suite.
   * @param {jasmine.Suite} suite Suite (Must not set, for recursive process.)
   * @return {jasmine.Suite} Current suite.
   */
  getCurrentSuite(suite?: jasmine.Suite): jasmine.Suite {
    if (this._currentSpec) {
      return this._findOwnerSuite(this._currentSpec);
    }

    if (!suite) {
      return this.getCurrentSuite(jasmine.getEnv().topSuite());
    }


    const suites = suite.children.filter((child) => child instanceof jasmine.Suite);
    if (suites.length > 0) {
      return this.getCurrentSuite(suites.slice(-1)[0] as jasmine.Suite);
    }

    return suite;
  }

  /**
   * Find a owner suite of a spec.
   * @param {jasmine.Spec}  spec  Spec.
   * @param {jasmine.Suite} suite Suite (Must not set, for recursive process.)
   * @return {jasmine.Suite} Owner suite of a spec
   */
  private _findOwnerSuite(spec: jasmine.Spec, suite?: jasmine.Suite): jasmine.Suite {
    if (!suite) {
      return this._findOwnerSuite(spec, jasmine.getEnv().topSuite());
    }

    if (suite.children.indexOf(spec) != -1) {
      return suite;
    }

    return suite.children
      .filter((child) => child instanceof jasmine.Suite)
      .map((child) => this._findOwnerSuite(spec, child as jasmine.Suite))
      .find((child) => child) as jasmine.Suite;
  }

  /**
   * Process start event.
   * @param {jasmine.Spec} spec Starting spec.
   */
  private _onStart(spec: jasmine.Spec) {
    this._currentSpec = spec;
  }

  /**
   * Process finish event.
   */
  private _onEnd() {
    this._currentSpec = null;
  }

  /**
   * Create event hooks.
   */
  private _createEventHooks() {
    global.afterEach(() => this._onEnd());
    global.beforeAll(() => this._injectOnStartHookToAllSpec(jasmine.getEnv().topSuite()));
  }

  /**
   * Inject onStart hook to spec.
   * @param {jasmine.Suite | jasmine.Spec} context コンテキスト
   */
  private _injectOnStartHookToAllSpec(context: jasmine.Suite | jasmine.Spec) {
    if (context instanceof jasmine.Spec) {
      const original = context.onStart;
      context.onStart = ((...args) => {
        this._onStart(context);
        return original(...args);
      });
    } else {
      context.children.forEach((child) => this._injectOnStartHookToAllSpec(child));
    }
  }
}
