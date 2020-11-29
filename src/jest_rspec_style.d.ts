import Lazy            from './jest_rspec_styles/lazy_variables/lazy.interface';
import Subject         from './jest_rspec_styles/lazy_variables/subject.interface';
import SharedExamples  from './jest_rspec_style/shared_examples/shared_examples.interface';
import IncludeExamples from './jest_rspec_style/shared_examples/include_examples.interface';
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
