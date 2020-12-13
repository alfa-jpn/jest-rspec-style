import ExpectedStubChain from './expected_stub_chain';

/**
 * Interface of expect.
 */
interface Expect {
  (target: any): ExpectedStubChain;
}
export default Expect;
