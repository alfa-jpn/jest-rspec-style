/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StubChain from './stub_chain';

/**
 * Expected call stub chain.
 */
export default class ExpectedStubChain extends StubChain {
  private _isNot = false;
  private _with: any = null;
  private _times = 1;

  /**
   * Expect not calling.
   * @return {this} chain instance.
   */
  not(): this {
    this._isNot = true;
    return this;
  }

  /**
   * Expect calling times.
   * @param {Number} times Times of calling.
   * @return {this} chain instance.
   */
  times(times: number): this {
    this._times = times;
    return this;
  }

  /**
   * Expect calling args.
   * @param {Array<Object>} args Arguments of calling.
   * @return {this} chain instance.
   */
  with(...args: any): this {
    this._with = args;
    return this;
  }

  /**
   * Verify calling state.
   * @abstract
   * @throws on fail.
   */
  verify(): void {
    if (this._isNot) {
      expect(this._mock).not.toHaveBeenCalled();
      return;
    }

    expect(this._mock).toHaveBeenCalledTimes(this._times);
    if (this._with) {
      expect(this._mock).toHaveBeenCalledWith(...this._with);
    }
  }
}
