/**
 * Interface of shared examples.
 */
interface SharedExmples {
  (name: string, examples: (...args: any) => void): void;
}
export default SharedExmples;
