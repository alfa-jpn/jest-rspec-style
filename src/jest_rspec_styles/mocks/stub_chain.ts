/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Stub chain.
 */
export default class StubChain {
  private _target: any;
  private _original?: (...args: any) => any;
  private _returningValue: any;
  private _function?: (...args: any) => any;
  protected _mock?: jest.MockInstance<any, any>;

  /**
   * Initialize
   * @param {Object} target Stub target.
   */
  constructor(target: any) {
    this._target = target;
  }

  /**
   * Call original implementation.
   * @return {this} chain instance.
   */
  andCallOriginal(): this {
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
   * @return {this} chain instance.
   */
  andReturn(value: any): this {
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
   * @return {this} chain instance.
   */
  do(func: (...args: any) => any): this {
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
   * @return {this} chain instance;
   */
  toReceive(method: string): this {
    return this.toReceiveMessageChain(method);
  }

  /**
   * Mock method chain.
   * @param {string} methods name of method.
   * @return {this} chain instance;
   */
  toReceiveMessageChain(...methods: [string]): this {
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

    this._mock = mocks[mocks.length - 1];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: StubChain = this;
    this._mock.mockImplementation(function(...args) {
      if (_this._returningValue) {
        return _this._returningValue;
      }

      if (_this._function) {
        const callerContext = eval('this');
        return _this._function.bind(callerContext)(...args);
      }
    });

    return this;
  }

  /**
   * Verify calling state.
   * @abstract
   * @throws on fail.
   */
  verify(): void {
    // Nothing to do in StubChain.
  }
}
