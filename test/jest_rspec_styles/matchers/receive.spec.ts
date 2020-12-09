import '../../spec_helper';

describe('toReceive', () => {
  subject(() => {
    lazy('expect');
  });

  lazy('expect', () => {
    const date = new Date();
    expect(date).toReceive('toString');
    date.toString();
  });

  it('Usable', () => {
    subject();
  });

  context('When set times', () => {
    lazy('expect', () => {
      const date = new Date();
      expect(date).toReceive('toString', {times: 2});
      date.toString();
      date.toString();
    });

    it('Usable', () => {
      subject();
    });
  });

  context('When set with', () => {
    lazy('expect', () => {
      const date = new Date();
      expect(date).toReceive('toString', {with: [1, 2, 3]});
      (date as any).toString(1, 2, 3);
    });

    it('Usable', () => {
      subject();
    });
  });

  context('When expect not receive', () => {
    lazy('expect', () => {
      const date = new Date();
      expect(date).not.toReceive('toString');
    });

    it('Usable', () => {
      subject();
    });
  });
});
