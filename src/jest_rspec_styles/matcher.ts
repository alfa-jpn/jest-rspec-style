import toChange from './matchers/change';
import Mock     from './mock';

/**
 * Matchers
 */
export default class {
  private _mock: Mock;
  private _expect: jest.Expect;

  /**
   * Initialize.
   * @param {Mock} mock tracker of jest
   */
  constructor(mock: Mock) {
    this._mock = mock;
    this._expect = expect;
  }

  /**
   * Setup matchers.
   */
  setup(): void {
    this._extendExpect();
    this._extendJestMatchers();
  }

  /**
   * Exptend expect method.
   */
  private _extendExpect(): void {
    const expect = ((actual: any) => {
      const original = this._expect(actual);

      const matchers: any = {...original,
        toReceive: (method: string) => {
          return this._mock.expect(actual).toReceive(method);
        },
        not: {...original.not,
          toReceive: (method: string) => {
            return matchers.toReceive(method).not();
          },
        },
      };

      return matchers;
    });

    (global as any).expect = Object.assign(expect, this._expect);
  }

  /**
   * Extend jest matchers.
   */
  private _extendJestMatchers(): void {
    expect.extend({
      toChange,
    });
  }
}
