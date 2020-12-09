import toChange,  {ChangeOptionsParamter}  from './matchers/change';
import toReceive, {ReceiveOptionsParamter} from './matchers/receive';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toChange(fn: () => any, options?: ChangeOptionsParamter): R
      toReceive(method: string, options?: ReceiveOptionsParamter): R
    }
  }
}

export default {
  toChange,
  toReceive,
};
