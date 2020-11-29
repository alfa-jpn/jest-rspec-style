/**
 * Interface of lazy method.
 */
interface Lazy {
  (name: string, evaluator?: () => any): any;
}
export default Lazy;
