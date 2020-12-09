/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export interface ReceiveOptionsParamter {
  times?: number,
  with?: any
}

interface Expectation extends ReceiveOptionsParamter {
  stub: jest.Mock;
  isNot: boolean;
}

let expectations: Array<Expectation>;

/**
 * Change matcher is used to specify that a function return value changes some mutable state.
 * @param {OBject}   this     Context,
 * @param {Object}   actual   Action.
 * @param {Function} receiver Function that return test value.
 * @param {Object}   options  Options. { times, with }
 * @return {Object} Result.
 */
export default function(this: any, actual: any, receiver: string, options: ReceiveOptionsParamter = {}): jest.CustomMatcherResult { // eslint-disable-line max-len
  allow(actual).toReceive(receiver).andCallOriginal();
  const isNot: boolean = this.isNot; // eslint-disable-line no-invalid-this

  expectations.push({
    ...options,
    stub:  actual[receiver],
    isNot: isNot,
  });

  return {
    message: /* istanbul ignore next */ () => 'not call',
    pass:    !isNot,
  };
}

beforeEach(() => {
  expectations = [];
});

afterEach(() => {
  expectations.forEach((expectation: Expectation) => {
    if (expectation.isNot) {
      expect(expectation.stub).not.toHaveBeenCalled();
    } else {
      expect(expectation.stub).toHaveBeenCalled();
      if (expectation.with) expect(expectation.stub).toHaveBeenCalledWith(...expectation.with);
      if (expectation.times) expect(expectation.stub).toHaveBeenCalledTimes(expectation.times);
    }
  });
});
