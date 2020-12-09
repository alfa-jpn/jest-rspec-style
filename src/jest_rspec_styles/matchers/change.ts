export interface ChangeOptionsParamter {
  from?: any,
  to?: any,
}

/**
 * Change matcher is used to specify that a function return value changes some mutable state.
 * @param {Object}   actual Action.
 * @param {Function} receiver       Function that return test value.
 * @param {Object}   options  Options. { from, to }
 * @return {Promise|Object} Result.
 */
export default function(actual: () => any, receiver: () => any, options: ChangeOptionsParamter = {}): jest.CustomMatcherResult | Promise<jest.CustomMatcherResult> { // eslint-disable-line max-len
  if (!(actual instanceof Function)) {
    return {
      message: () => `${actual} value must be a function`,
      pass:    false,
    };
  }

  if (!(receiver instanceof Function)) {
    return {
      message: () => `${receiver} value must be a function`,
      pass:    false,
    };
  }

  const beforeValue = receiver();
  if ('from' in options) {
    if (beforeValue !== options.from) {
      return {
        message: () => `expected ${beforeValue} to have initially been ${options.from}, but was ${beforeValue}`,
        pass:    false,
      };
    }
  }

  const validate = () => {
    const afterValue = receiver();

    if (beforeValue === afterValue) {
      return {
        message: () => `expected ${beforeValue} to have changed, but is still ${beforeValue}`,
        pass:    false,
      };
    }

    if ('to' in options) {
      if (afterValue !== options.to) {
        return {
          message: () => `expected ${beforeValue} to have changed to ${options.to}, but is now ${afterValue}`,
          pass:    false,
        };
      }
    }

    return {
      message: () => `expected ${beforeValue} not to have changed, but changed to ${afterValue}`,
      pass:    true,
    };
  };

  const result = actual();
  if (result instanceof Promise) {
    return new Promise((resolve) => {
      result.then(() => {
        resolve(validate());
      });
    });
  } else {
    return validate();
  }
}
