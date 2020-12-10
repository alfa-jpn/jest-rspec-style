/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Stub chain.
 */
export default class StubChain {
  private _target: any;
  private _original?: (...args: any) => any;
  private _returningValue: any;
  private _function?: (...args: any) => any;

  /**
   * Initialize
   * @param {Object} target Stub target.
   */
  constructor(target: any) {
    this._target = target;
  }

  /**
   * Call original implementation.
   * @return {StubChain} chain instance.
   */
  andCallOriginal(): StubChain {
    if (this._original) {
      this._function = this._original;
    } else {
      throw new Error('Must call, after call #toReceive or #toReceiveMessageChain');
    }
    return this;
  }

  /**
   * Set returning value.
   * @param {Object} value returning value
   * @return {StubChain} chain instance.
   */
  andReturn(value: any): StubChain {
    if (this._original) {
      this._returningValue = value;
    } else {
      throw new Error('Must call, after call #toReceive or #toReceiveMessageChain');
    }
    return this;
  }

  /**
   * Set execute function.
   * @param {Function} func function.
   * @return {StubChain} chain instance.
   */
  do(func: (...args: any) => any): StubChain {
    if (this._original) {
      this._function = func;
    } else {
      throw new Error('Must call, after call #toReceive or #toReceiveMessageChain');
    }
    return this;
  }

  /**
   * Mock method.
   * @param {string} method name of method.
   * @return {StubChain} chain instance;
   */
  toReceive(method: string): StubChain {
    return this.toReceiveMessageChain(method);
  }

  /**
   * Mock method chain.
   * @param {string} methods name of method.
   * @return {StubChain} chain instance;
   */
  toReceiveMessageChain(...methods: [string]): StubChain {
    this._original = this._target[methods[0]];

    const mocks: Array<jest.MockInstance<any, any>> = [];

    methods.reduce((target: any, method: string) => {
      const stub = {};

      target[method] = target[method] || jest.fn();
      if (jest.isMockFunction(target[method])) {
        target[method] = jest.fn(target[method]);
      } else {
        jest.spyOn(target, method);
      }
      mocks.push(target[method].mockImplementation(() => stub));

      return stub;
    }, this._target);

    const stubChain: StubChain = eval('this');
    mocks[mocks.length - 1].mockImplementation(function(...args) {
      if (stubChain._returningValue) {
        return stubChain._returningValue;
      }

      if (stubChain._function) {
        const context = eval('this');
        return stubChain._function.bind(context)(...args);
      }
    });

    return this;
  }
}
