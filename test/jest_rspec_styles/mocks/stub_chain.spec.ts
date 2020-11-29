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

    it('Call stub.', () => {
      expect(lazy('target').call()).toEqual('Original');
      subject();
      expect(lazy('target').call()).toEqual(undefined);
    });
  });

  describe('#toReceiveMesageChain', () => {
    subject(() => {
      lazy('described_instance').toReceiveMessageChain('call', 'hoge', 'fuga');
    });

    it('Call stub.', () => {
      expect(lazy('target').call()).toEqual('Original');
      subject();
      expect(lazy('target').call().hoge().fuga()).toEqual(undefined);
    });
  });

  describe('#andReturn', () => {
    subject(() => {
      lazy('chain').andReturn('Stub');
    });

    lazy('chain', () => {
      return lazy('described_instance').toReceive('call');
    });

    it('Call stub.', () => {
      expect(lazy('target').call()).toEqual('Original');
      subject();
      expect(lazy('target').call()).toEqual('Stub');
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

    it('Call original implementation.', () => {
      expect(lazy('target').call()).toEqual('Original');
      subject();
      expect(lazy('target').call()).toEqual('Original');
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

    it('Call do function.', () => {
      expect(lazy('target').call()).toEqual('Original');
      subject();
      expect(lazy('target').call()).toEqual('Stub-Do');
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
});
