/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ExpectedStubChain from './mocks/expected_stub_chain';
import StubChain         from './mocks/stub_chain';

/**
 * Stub
 */
export default class Mock {
  private _stubChains: Array<StubChain> = [];

  /**
   * Stub object.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  allow(target: any): StubChain {
    const stub = new StubChain(target);
    this._stubChains.push(stub);
    return stub;
  }

  /**
   * Stub all instance of object.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  allowAnyInstanceOf(target: any): StubChain {
    return this.allow(target.prototype);
  }

  /**
   * Expect and stub object.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  expect(target: any): ExpectedStubChain {
    const stub = new ExpectedStubChain(target);
    this._stubChains.push(stub);
    return stub;
  }

  /**
   * Expect and stub all instance of object.
   * @param {Object} target Stub target.
   * @return {StubChain} Stub hain.
   */
  expectAnyInstanceOf(target: any): ExpectedStubChain {
    return this.expect(target.prototype);
  }

  /**
   * Reet stubs.
   */
  reset(): void {
    this._stubChains = [];
    jest.restoreAllMocks();
  }

  /**
   * Verify stub chains.
   */
  verify(): void {
    this._stubChains.forEach((stub) => stub.verify());
  }
}
