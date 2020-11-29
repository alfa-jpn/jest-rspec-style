/**
 * Shims for jasmine private interfaces.
 */
declare namespace jasmine {
  function getEnv(): Env

  /**
   * Execution environment of jasmine.
   */
  class Env {
    topSuite(): Suite
  }

  /**
   * Spec defintion of jasmine.
   */
  class Spec {
    id: string
    description: string
    onStart(...args: any[]): any
  }

  /**
   * Suite definition of jasmine.
   */
  class Suite {
    id: string
    description: string
    children: Array<Spec|Suite>
    parentSuite: Suite
  }
}
