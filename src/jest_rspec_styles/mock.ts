/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import StubChain from './mocks/stub_chain';

/**
 * Stub
 */
export default class Mock {
  /**
   * Stub object.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  allow(target: any): StubChain {
    return new StubChain(target);
  }

  /**
   * Stub all object instances.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  allowAnyInstanceOf(target: any): StubChain {
    return this.allow(target.prototype);
  }

  /**
   * Reet stubs.
   */
  reset(): void {
    jest.restoreAllMocks();
  }
}
