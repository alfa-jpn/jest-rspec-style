# jest-rspec-style
RSpec like DSL extension for jest.

## Installation

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

    context('When stub', () => {
      beforeEach(() => {
        allowAnyInstanceOf(lazy('hoge')).toReceive('call').andReturn('stub-value')
      })

      it('Return stub value', () =>
        expect(subject()).toEqual('stub-value')
        expect(lazy('hoge').call).toHaveBeenCalled()
      )
    })

    context('When stub all instance', () => {
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
