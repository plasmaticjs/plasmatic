import { expect } from 'chai';
import fn from 'PlasmaticError';

describe('PlasmaticError', () => {
  context('instance', () => {
    it('should instantiate new error', () => {
      const service = fn('Throw this error');
      expect(service instanceof Error).to.be.true;
    });

    it('should print correct message', () => {
      const service = fn('Throw this error');
      expect(service.message).to.be.eql('Throw this error');
    });
  });
});
