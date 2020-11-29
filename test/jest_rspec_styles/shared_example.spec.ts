import '../spec_helper';
import SharedExample from '../../src/jest_rspec_styles/shared_example';

describe('SharedExample', () => {
  lazy('described_instance', () => {
    return new SharedExample();
  });

  describe('#sharedExamples', () => {
    subject(() => {
      return lazy('described_instance').sharedExamples('sushi', () => '🍣');
    });

    it('Define shared example', () => {
      subject();
      expect(lazy('described_instance')._examples.sushi()).toEqual('🍣');
    });
  });

  describe('#includeExamples', () => {
    subject(() => {
      return lazy('described_instance').includeExamples(lazy('name'));
    });

    beforeEach(() => {
      lazy('described_instance').sharedExamples('sushi', () => '🍣');
    });

    lazy('name', () => {
      return 'sushi';
    });

    it('Inject examples.', () => {
      subject();
    });

    context('When undefined examples', () => {
      lazy('name', () => {
        return 'undefined';
      });

      it('Throw error.', () => {
        expect(() => subject()).toThrowError('"undefined" is unknown shared example.');
      });
    });
  });
});
