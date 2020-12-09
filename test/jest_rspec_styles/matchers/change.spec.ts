import '../../spec_helper';

describe('toChange', () => {
  subject(async () => {
    try {
      await lazy('expect');
      return null;
    } catch (e) {
      return e.message;
    }
  });

  lazy('expect', () =>
    expect(lazy('actual')).toChange(lazy('receiver'))
  );

  lazy('actual', () =>
    () => lazy('data').value++
  );

  lazy('receiver', () =>
    () => lazy('data').value
  );

  lazy('data', () => ({
    value: 1,
  }));

  it('Pass test', async () => {
    expect(await subject()).toBeNull();
  });

  context('When not change', () => {
    lazy('actual', () => {
      return () => {
        lazy('data').value;
      };
    });

    it('Fail test', async () => {
      expect(await subject()).toEqual('expected 1 to have changed, but is still 1');
    });

    context('When expect not change', () => {
      lazy('expect', () =>
        expect(lazy('actual')).not.toChange(lazy('receiver'))
      );

      it('Pass test', async () => {
        expect(await subject()).toBeNull();
      });
    });
  });

  context('When set from and to', () => {
    lazy('expect', () =>
      expect(lazy('actual')).toChange(lazy('receiver'), {from: lazy('from'), to: lazy('to')})
    );

    lazy('from', () =>
      1
    ),

    lazy('to', () =>
      2
    ),

    it('Pass test', async () => {
      expect(await subject()).toBeNull();
    });

    context('When initial value is invalid', () => {
      lazy('from', () =>
        0
      ),

      it('Fail test', async () => {
        expect(await subject()).toEqual('expected 1 to have initially been 0, but was 1');
      });
    });

    context('When changed value is invalid', () => {
      lazy('to', () =>
        3
      ),

      it('Fail test', async () => {
        expect(await subject()).toEqual('expected 1 to have changed to 3, but is now 2');
      });
    });
  });

  context('When actual is async', () => {
    lazy('actual', () =>
      async () => lazy('data').value++
    );

    it('Pass test', async () => {
      expect(await subject()).toBeNull();
    });
  });

  context('When actual is not function', () => {
    lazy('actual', () =>
      'hoge'
    );

    it('Fail test', async () => {
      expect(await subject()).toEqual('hoge value must be a function');
    });
  });

  context('When receiver is not function', () => {
    lazy('receiver', () =>
      'fuga'
    );

    it('Fail test', async () => {
      expect(await subject()).toEqual('fuga value must be a function');
    });
  });

  context('When expect not change', () => {
    lazy('expect', () =>
      expect(lazy('actual')).not.toChange(lazy('receiver'))
    );

    it('Fail test', async () => {
      expect(await subject()).toEqual('expected 1 not to have changed, but changed to 2');
    });
  });
});
