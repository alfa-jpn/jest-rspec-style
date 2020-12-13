import '../spec_helper';

describe('Matcher', () => {
  describe('#toChange', () => {
    subject(() => {
      let cnt = 0;
      expect(() => cnt++).toChange(() => cnt);
      expect(() => cnt++).toChange(() => cnt, {from: 1, to: 2});
    });

    it('Usable', () => {
      subject();
    });
  });

  describe('#toReceive', () => {
    subject(() => {
      const date: any = new Date();
      expect(date).toReceive('toString').with('hoge').times(2);
      date.toString('hoge');
      date.toString('hoge');
    });

    it('Usable', () => {
      subject();
    });

    context('When call not to receive', () => {
      subject(() => {
        const date = new Date();
        expect(date).not.toReceive('toString');
      });

      it('Usable', () => {
        subject();
      });
    });
  });
});
