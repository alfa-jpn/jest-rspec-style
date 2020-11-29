import StubChain from './stub_chain';

/**
 * Interface of allow.
 */
interface Allow {
  (target: any): StubChain;
}
export default Allow;
