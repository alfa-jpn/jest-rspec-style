import '../spec_helper';
import JestRSpecStyle from '../../src/jest_rspec_style';
import LazyVariable   from '../../src/jest_rspec_styles/lazy_variable';

describe('LazyVariable', () => {
  lazy('described_instance', () => {
    return new LazyVariable(lazy('tracker'));
  });

  lazy('tracker', () => {
    return (JestRSpecStyle as any)._lazy._tracker;
  });

  describe('#lazy', () => {
    subject(() => {
      return lazy('described_instance').lazy('sushi', () => '🍣');
    });

    it('Define lazy variable.', () => {
      subject();
      expect(lazy('described_instance')._definitions[0].name).toEqual('sushi');
      expect(lazy('described_instance')._definitions[0].eval()).toEqual('🍣');
    });
  });

  describe('#subject', () => {
    subject(() => {
      return lazy('described_instance').subject(() => '大トロ🍣');
    });

    it('Define subject.', () => {
      subject();
      expect(lazy('described_instance')._definitions[0].name).toEqual('subject');
      expect(lazy('described_instance')._definitions[0].eval()).toEqual('大トロ🍣');
    });
  });
});
