# jest-rspec-style
[![Build Status](https://travis-ci.org/alfa-jpn/jest-rspec-style.svg?branch=master)](https://travis-ci.org/alfa-jpn/jest-rspec-style)

RSpec like DSL extension for jest.

## Installation

```shell
npm install --save-dev jest-rspec-style
```

## Usage
Usable RSpec like DSL.

Write `spec_heler`.

```javascript
import JestRSpesStyle from 'jest-rspec-style';
JestRSpesStyle.setup();
```

Write test.

```javascript
import 'spec_helper'

describe('Hoge', () => {
  lazy('hoge', () =>
    new Hoge({ value: lazy('value') })
  )

  describe('#call', () => {
    subject(() =>
      lazy('hoge').call()
    )

    lazy('value', () =>
      'hoge-value'
    )

    it('Return value', () => {
      expect(subject()).toEqual('hoge-vale')
    })

    context('When use change matcher', () => {
      it('Changed', () => {
        let cnt = 0;
        expect(() => cnt++).toChange(() => cnt);
        expect(() => cnt++).toChange(() => cnt, { from: 1, to: 2});
      })
    })

    context('When use receive matcher', () => {
      it('Received', () => {
        const date = new Date();
        expect(date).toReceive('toString')
        date.toString();
      })

      it('2 times Received', () => {
        const date = new Date();
        expect(date).toReceive('toString').times(2)
        date.toString();
        date.toString();
      })

      it('Received with args', () => {
        const date = new Date();
        expect(date).toReceive('setTime').with(123)
        date.setTime(123);
      })
    })

    context('When use stub', () => {
      beforeEach(() => {
        allowAnyInstanceOf(lazy('hoge')).toReceive('call').andReturn('stub-value')
      })

      it('Return stub value', () =>
        expect(subject()).toEqual('stub-value')
        expect(lazy('hoge').call).toHaveBeenCalled()
      )
    })

    context('When use stub all instance', () => {
      beforeEach(() => {
        allowAnyInstanceOf(Hoge).toReceive('call').andReturn('stub-value')
      })

      it('Return stub value', () =>
        expect(subject()).toEqual('stub-value')
        expect(lazy('hoge').call).toHaveBeenCalled()
      )
    })

    sharedExamples('Hoge calls', (times) => {
      it(`Call ${times}`, () => {
        Array(times).fill().forEach(() => {
          lazy('hoge').call()
        })
      })
    })

    includeExamples('Hoge calls', 3)
  })
});
```

- allow
- allowAnyInstanceOf
- sharedExamples
- includeExamples
- context
- lazy
- expect(...).toChange(() => ..., { from: .., to: ..})
- expect(...).toReceive(...).with(..).times(..)
- expectAnyInstanceOf(...).toReceive(...).with(..).times(..)

## Contributing
Bug reports and pull requests are welcome on GitHub.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Test

```shell
./bin/test
```
