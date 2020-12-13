import '../../spec_helper';
import StubChain from '../../../src/jest_rspec_styles/mocks/stub_chain';

describe('StubChain', () => {
  lazy('described_instance', () => {
    return new StubChain(lazy('target'));
  });

  lazy('target', () => {
    return {
      call: () => 'Original',
    };
  });

  describe('#toReceive', () => {
    subject(() => {
      lazy('described_instance').toReceive('call');
    });

    it('Set stub.', () => {
      expect(subject).toChange(() => lazy('target').call(), {
        from: 'Original',
        to:   undefined,
      });
    });
  });

  describe('#toReceiveMesageChain', () => {
    subject(() => {
      lazy('described_instance').toReceiveMessageChain('call', 'hoge', 'fuga');
    });

    it('Set stub.', () => {
      expect(subject).toChange(() => lazy('target').call().hoge && lazy('target').call().hoge().fuga, {
        from: undefined,
      });
    });
  });

  describe('#andReturn', () => {
    subject(() => {
      lazy('chain').andReturn('Stub');
    });

    lazy('chain', () => {
      return lazy('described_instance').toReceive('call');
    });

    it('Set stub.', () => {
      expect(subject).toChange(() => lazy('target').call(), {
        from: 'Original',
        to:   'Stub',
      });
    });

    context('When before call #toReceive', () => {
      lazy('chain', () => {
        return lazy('described_instance');
      });

      it('Throw error.', () => {
        expect(() => subject()).toThrowError('Must call, after call #toReceive or #toReceiveMessageChain');
      });
    });
  });

  describe('#andCallOriginal', () => {
    subject(() => {
      lazy('chain').andCallOriginal();
    });

    lazy('chain', () => {
      return lazy('described_instance').toReceive('call');
    });

    it('Set stub.', () => {
      expect(subject).toChange(() => jest.isMockFunction(lazy('target').call), {
        from: false,
        to:   true,
      });
    });

    it('Call original implementation.', () => {
      expect(subject).not.toChange(() => lazy('target').call(), {from: 'Original'});
    });

    context('When before call #toReceive', () => {
      lazy('chain', () => {
        return lazy('described_instance');
      });

      it('Throw error.', () => {
        expect(() => subject()).toThrowError('Must call, after call #toReceive or #toReceiveMessageChain');
      });
    });
  });

  describe('#do', () => {
    subject(() => {
      lazy('chain').do(() => {
        return 'Stub-Do';
      });
    });

    lazy('chain', () => {
      return lazy('described_instance').toReceive('call');
    });

    it('Set stub.', () => {
      expect(subject).toChange(() => lazy('target').call(), {
        from: 'Original',
        to:   'Stub-Do',
      });
    });

    context('When before call #toReceive', () => {
      lazy('chain', () => {
        return lazy('described_instance');
      });

      it('Throw error.', () => {
        expect(() => subject()).toThrowError('Must call, after call #toReceive or #toReceiveMessageChain');
      });
    });
  });

  describe('#verify', () => {
    subject(() => {
      lazy('chain').verify();
    });

    lazy('chain', () => {
      return lazy('described_instance').toReceive('call');
    });

    it('Not throw error.', () => {
      expect(subject).not.toThrowError();
    });
  });
});
