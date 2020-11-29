import '../spec_helper';
import Mock from '../../src/jest_rspec_styles/mock';

describe('Mock', () => {
  lazy('described_instance', () => {
    return new Mock();
  });

  describe('#alow', () => {
    subject(() => {
      return lazy('described_instance').allow(lazy('target')).toReceive('toString').andReturn('stub-value');
    });

    lazy('target', () => {
      return new Date();
    });

    it('Stub method', () => {
      subject();
      expect(lazy('target').toString()).toEqual('stub-value');
    });
  });

  describe('#alowAnyInstanceOf', () => {
    subject(() => {
      return lazy('described_instance').allowAnyInstanceOf(lazy('target')).toReceive('toString').andReturn('stub-value');
    });

    lazy('target', () => {
      return Date;
    });

    it('Stub method', () => {
      subject();
      expect((new Date()).toString()).toEqual('stub-value');
    });
  });
});
