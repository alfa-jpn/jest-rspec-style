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
      const date = new Date();
      expect(date).toReceive('toString');
      date.toString();
    });

    it('Usable', () => {
      subject();
    });
  });
});
