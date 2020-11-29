import JestTracker     from './jest_rspec_styles/jest_tracker';
import LazyVariable    from './jest_rspec_styles/lazy_variable';
import SharedExample   from './jest_rspec_styles/shared_example';
import Mock            from './jest_rspec_styles/mock';
import Lazy            from './jest_rspec_styles/lazy_variables/lazy.interface';
import Subject         from './jest_rspec_styles/lazy_variables/subject.interface';
import SharedExamples  from './jest_rspec_styles/shared_examples/shared_examples.interface';
import IncludeExamples from './jest_rspec_styles/shared_examples/include_examples.interface';
import Allow           from './jest_rspec_styles/mocks/allow.interface';

/**
 * Global extension.
 */
declare global {
  /* eslint-disable no-var */
  var context: jest.Describe;
  var lazy: Lazy;
  var subject: Subject;
  var sharedExamples: SharedExamples;
  var includeExamples: IncludeExamples;
  var allow: Allow;
  var allowAnyInstanceOf: Allow;
  /* eslint-enable no-var */
}

/**
 * RSpec style extension for jest.
 *
 * @example
 * import JestRSpecStyle from 'jest-rspec-style';
 * JestRSpecStyle.setup();
 */
export default class JestRSpecStyle {
  private static _lazy: LazyVariable;
  private static _sharedExample: SharedExample;
  private static _mock: Mock;

  /**
   * Setup plugin.
   */
  static setup(): void {
    const tracker = new JestTracker();
    this._lazy = new LazyVariable(tracker);
    this._sharedExample = new SharedExample();
    this._mock = new Mock();

    global.context = global.describe;
    global.lazy = this._lazy.lazy.bind(this._lazy);
    global.subject = this._lazy.subject.bind(this._lazy);
    global.sharedExamples = this._sharedExample.sharedExamples.bind(this._sharedExample);
    global.includeExamples = this._sharedExample.includeExamples.bind(this._sharedExample);
    global.allow = this._mock.allow.bind(this._mock);
    global.allowAnyInstanceOf = this._mock.allowAnyInstanceOf.bind(this._mock);

    afterEach(this._reset.bind(this));
  }

  /**
   * Reset status.
   */
  private static _reset(): void {
    this._lazy.reset();
    this._mock.reset();
  }
}
