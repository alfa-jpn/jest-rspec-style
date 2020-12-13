import './spec_helper';

describe('jest-rspec-style', () => {
  describe('.context', () => {
    context('When use context.', () => {
      it('Run test', () => {
        expect(true).toBeTruthy();
      });
    });
  });

  describe('.lazy', () => {
    lazy('sushi', () => {
      return 'マグロ🍣';
    });

    it('Reference lazy variable.', () => {
      expect(lazy('sushi')).toEqual('マグロ🍣');
    });

    it('Reference lazy variable from parallel test.', () => {
      expect(lazy('sushi')).toEqual('マグロ🍣');
    });

    context('When overwrite variable', () => {
      lazy('sushi', () => {
        return '鮪🍣';
      });

      it('Reference lazy variable.', () => {
        expect(lazy('sushi')).toEqual('鮪🍣');
      });
    });

    context('When overwrite variable parallel', () => {
      lazy('sushi', () => {
        return 'MAGURO🍣';
      });

      it('Reference lazy variable.', () => {
        expect(lazy('sushi')).toEqual('MAGURO🍣');
      });
    });

    context('When not overwrite', () => {
      it('Reference lazy variable.', () => {
        expect(lazy('sushi')).toEqual('マグロ🍣');
      });

      context('When overwrite variable', () => {
        lazy('sushi', () => {
          return '大トロ🍣';
        });

        it('Reference lazy variable.', () => {
          expect(lazy('sushi')).toEqual('大トロ🍣');
        });
      });
    });

    context('When reference other lazy variable', () => {
      lazy('sushi', () => {
        return lazy('other-sushi');
      });

      context('When define other-sushi', () => {
        lazy('other-sushi', () => {
          return '中トロ🍣';
        });

        it('Reference lazy variable.', () => {
          expect(lazy('sushi')).toEqual('中トロ🍣');
        });
      });
    });

    context('When reference undefined lazy variable', () => {
      it('Throw error.', () => {
        expect(() => lazy('undefined')).toThrowError('lazy(\'undefined\') is not defined.');
      });
    });

    context('When reference in beforeEach', () => {
      let _tmp: string;

      beforeEach(() => {
        _tmp = lazy('sushi');
      });

      it('Reference lazy variable.', () => {
        expect(_tmp).toEqual('マグロ🍣');
      });
    });

    context('When refrence multiple times', () => {
      let _tmp = 0;

      beforeEach(() => {
        lazy('sushi');
        lazy('sushi');
        lazy('sushi');
      });

      lazy('sushi', () => {
        return `${++_tmp}皿`;
      });

      it('Cached variable.', () => {
        expect(lazy('sushi')).toEqual('1皿');
      });
    });
  });

  describe('.subject', () => {
    subject(() => {
      return 'i love sushi.';
    });

    it('Reference subject.', () => {
      expect(subject()).toEqual('i love sushi.');
    });
  });

  describe('.sharedExamples/.includeExamples', () => {
    sharedExamples('Kaiten sushi', (type: string, count: number) => {
      it(`Eat ${count} ${type}`, () => {
        expect(count % 3).toEqual(0);
      });
    });

    includeExamples('Kaiten sushi', 'マグロ', 12);
    includeExamples('Kaiten sushi', 'サーモン', 15);
  });

  describe('.allow', () => {
    subject(() => {
      return lazy('target').call();
    });

    lazy('target', () => {
      return {
        call: () => 'Original value',
      };
    });

    beforeEach(() => {
      allow(lazy('target')).toReceive('call').andReturn('Stub value');
    });


    it('Return stub value', () => {
      expect(subject()).toEqual('Stub value');
    });
  });

  describe('.allowAnyInstanceOf', () => {
    subject(() => {
      return (new Date()).toString();
    });

    beforeEach(() => {
      allowAnyInstanceOf(Date).toReceive('toString').andReturn('Stub value');
    });

    it('Return stub value', () => {
      expect(subject()).toEqual('Stub value');
    });
  });

  describe('.expectAnyInstanceOf', () => {
    subject(() => {
      return (new Date()).toString();
    });

    beforeEach(() => {
      expectAnyInstanceOf(Date).toReceive('toString').andReturn('Stub value');
    });

    it('Return stub value', () => {
      expect(subject()).toEqual('Stub value');
    });
  });
});
