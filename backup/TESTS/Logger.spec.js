import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import Logger from 'Logger';

chai.use(sinonChai);

let clock = sinon.useFakeTimers(1);
let consl = null;


const runningEnv = process.env.NODE_ENV;

describe('Logger', () => {
  afterEach(() => {
    clock.restore();
    process.env.NODE_ENV = runningEnv;
  });

  context('consl', () => {
    context('when running in production mode', () => {
      it('should not print any errors in env mode', () => {
        consl = sinon.stub(console, 'log');
        process.env.NODE_ENV = 'production';
        Logger.log('Log');

        consl.restore();
        expect(consl).to.be.not.called;
      });
    });
  });

  context('log', () => {
    it('should print log message', () => {
      consl = sinon.stub(console, 'log');
      const result = Logger.log('Log');

      consl.restore();

      expect(result).to.be.eql(['log', '[PLASMATIC]', 'Log']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });
  });

  context('info', () => {
    it('should print info message', () => {
      consl = sinon.stub(console, 'info');
      const result = Logger.info('Info');

      consl.restore();

      expect(result).to.be.eql(['info', '[PLASMATIC]', 'Info']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });
  });

  context('debug', () => {
    it('should print debug message without a time', () => {
      consl = sinon.stub(console, 'info');
      const result = Logger.debug('Debug');

      consl.restore();

      expect(result).to.be.eql(['info', '[PLASMATIC]', 'Debug']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });

    it('should print debug message with a time when end time is not specified', () => {
      consl = sinon.stub(console, 'info');
      clock = sinon.useFakeTimers(11);
      const result = Logger.debug('Debug', 1);

      consl.restore();

      expect(result).to.be.eql(['info', '[PLASMATIC]', 'Debug', '[10ms]']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });

    it('should print debug message with a time when start time is -1', () => {
      consl = sinon.stub(console, 'info');
      clock = sinon.useFakeTimers(10);
      const result = Logger.debug('Debug', -1);

      consl.restore();

      expect(result).to.be.eql(['info', '[PLASMATIC]', 'Debug', '[0ms]']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });

    it('should print debug message with a time when start and end is specified', () => {
      consl = sinon.stub(console, 'info');
      const result = Logger.debug('Debug', 1, 11);

      consl.restore();

      expect(result).to.be.eql(['info', '[PLASMATIC]', 'Debug', '[10ms]']);
      expect(consl).to.be.calledWith(...result.slice(1, result.length));
    });
  });
});
