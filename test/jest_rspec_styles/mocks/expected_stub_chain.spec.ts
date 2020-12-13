import '../../spec_helper';
import ExpectedStubChain from '../../../src/jest_rspec_styles/mocks/expected_stub_chain';

describe('ExpectedStubChain', () => {
  lazy('described_instance', () => {
    return new ExpectedStubChain(lazy('target'));
  });

  lazy('target', () => {
    return {
      call: () => 'Original',
    };
  });

  describe('#not', () => {
    subject(() => {
      lazy('described_instance').not();
    });

    it('Set isNot.', () => {
      expect(subject).toChange(() => lazy('described_instance')._isNot, {
        from: false,
        to:   true,
      });
    });
  });

  describe('#times', () => {
    subject(() => {
      lazy('described_instance').times(3);
    });

    it('Set times.', () => {
      expect(subject).toChange(() => lazy('described_instance')._times, {
        from: 1,
        to:   3,
      });
    });
  });

  describe('#with', () => {
    subject(() => {
      lazy('described_instance').with(1, 2, 3);
    });

    it('Set with.', () => {
      expect(subject).toChange(() => lazy('described_instance')._with, {
        from: null,
      });
    });
  });

  describe('#verify', () => {
    subject(() => {
      lazy('described_instance').verify();
    });

    beforeEach(() => {
      lazy('described_instance').toReceive('call');
    });

    it('Throw error.', () => {
      expect(subject).toThrowError();
    });

    context('When called target', () => {
      beforeEach(() => {
        lazy('target').call();
      });

      it('Not throw error.', () => {
        expect(subject).not.toThrowError();
      });
    });

    context('When call #not', () => {
      beforeEach(() => {
        lazy('described_instance').not();
      });

      it('Not throw error.', () => {
        expect(subject).not.toThrowError();
      });

      context('When called target', () => {
        beforeEach(() => {
          lazy('target').call();
        });

        it('Throw error.', () => {
          expect(subject).toThrowError();
        });
      });
    });

    context('When call #with', () => {
      beforeEach(() => {
        lazy('described_instance').with(1, 2, 3);
      });

      context('When expected arguments', () => {
        beforeEach(() => {
          lazy('target').call(1, 2, 3);
        });

        it('Not throw error.', () => {
          expect(subject).not.toThrowError();
        });
      });

      context('When not expected arguments', () => {
        beforeEach(() => {
          lazy('target').call(1, 2);
        });

        it('Throw error.', () => {
          expect(subject).toThrowError();
        });
      });
    });
  });
});
