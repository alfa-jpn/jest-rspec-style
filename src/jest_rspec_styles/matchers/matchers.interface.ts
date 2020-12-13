import {ChangeOptionsParamter}  from './change';

/**
 * Interface of matchers.
 */
interface Matchers<R> {
  toChange(fn: () => any, options?: ChangeOptionsParamter): R
}

export default Matchers;
