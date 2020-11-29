import '../spec_helper';
import JestRSpecStyle from '../../src/jest_rspec_style';
import JestTracker    from '../../src/jest_rspec_styles/jest_tracker';

describe('JestTracker', () => {
  const tracker: JestTracker = (JestRSpecStyle as any)._lazy._tracker as JestTracker;
  const chain: Array<string> = [];

  describe('#getCurrentSuite', () => {
    subject(() => {
      return chain;
    });

    describe('Root', () => {
      chain.push(tracker.getCurrentSuite().description);

      context('Node1', () => {
        chain.push(tracker.getCurrentSuite().description);
      });

      context('Node2', () => {
        chain.push(tracker.getCurrentSuite().description);

        context('Node2-1', () => {
          chain.push(tracker.getCurrentSuite().description);
        });

        context('Node2-2', () => {
          chain.push(tracker.getCurrentSuite().description);
        });

        context('Node2-3', () => {
          chain.push(tracker.getCurrentSuite().description);

          context('Node2-3-1', () => {
            chain.push(tracker.getCurrentSuite().description);
          });
        });
      });

      context('Node3', () => {
        chain.push(tracker.getCurrentSuite().description);
      });
    });

    it('Return current suite.', () => {
      expect(subject()).toEqual([
        'Root',
        'Node1',
        'Node2',
        'Node2-1',
        'Node2-2',
        'Node2-3',
        'Node2-3-1',
        'Node3',
      ]);
    });

    context('When running test', () => {
      it('Return current suite.', () => {
        expect(tracker.getCurrentSuite().description).toEqual('When running test');
      });

      context('When exists multiple test', () => {
        it('Return current suite (1).', () => {
          expect(tracker.getCurrentSuite().description).toEqual('When exists multiple test');
        });

        it('Return current suite (2).', () => {
          expect(tracker.getCurrentSuite().description).toEqual('When exists multiple test');
        });
      });
    });
  });
});
