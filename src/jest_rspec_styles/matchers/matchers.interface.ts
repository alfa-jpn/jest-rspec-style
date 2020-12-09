import {ChangeOptionsParamter}  from './change';
import {ReceiveOptionsParamter} from './receive';

/**
 * Interface of matchers.
 */
interface Matchers<R> {
  toChange(fn: () => any, options?: ChangeOptionsParamter): R
  toReceive(method: string, options?: ReceiveOptionsParamter): R
}

export default Matchers;
