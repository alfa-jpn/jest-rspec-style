import '../../spec_helper';
import Definition from '../../../src/jest_rspec_styles/lazy_variables/definition';

describe('Definition', () => {
  lazy('described_instance', () => {
    return new Definition(lazy('name'), lazy('evaluator'), lazy('suiteId'));
  });

  lazy('name', () => {
    return 'sushi';
  });

  lazy('evaluator', () => {
    return () => 'maguro';
  });

  lazy('suiteId', () => {
    return 'suiteId';
  });

  describe('#name', () => {
    subject(() => {
      return lazy('described_instance').name;
    });

    it('Return a name.', () => {
      expect(subject()).toEqual(lazy('name'));
    });
  });

  describe('#suiteId', () => {
    subject(() => {
      return lazy('described_instance').suiteId;
    });

    it('Return a suite id.', () => {
      expect(subject()).toEqual(lazy('suiteId'));
    });
  });

  describe('#eval', () => {
    subject(() => {
      return lazy('described_instance').eval();
    });

    it('Return evaluated value.', () => {
      expect(subject()).toEqual('maguro');
    });
  });
});
