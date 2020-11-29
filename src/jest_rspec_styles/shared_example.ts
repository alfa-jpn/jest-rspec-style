/**
 * Shared Example.
 */
export default class SharedExample {
  private _examples: { [key: string]: (...args: any) => void; } = {};

  /**
   * Create shared example.
   * @param {string}   name     name of example.
   * @param {Function} examples example definition.
   */
  sharedExamples(name: string, examples: (...args: any) => void): void {
    this._examples[name] = examples;
  }

  /**
   * Inject shared example to current context.
   * @param {string} name name of example.
   */
  includeExamples(name: string, ...args: any): void { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    const example = this._examples[name];
    if (!example) {
      throw new Error(`"${name}" is unknown shared example.`);
    }

    context(name, () => {
      example(...args);
    });
  }
}
