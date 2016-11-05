import { expect } from 'chai';
import sinon from 'sinon';

import Plasmatic from 'Plasmatic';
import PlasmaticNode from 'PlasmaticNode';

let doc = null;
let fakeSelector = null;
let fakeComponent = null;
let clock = sinon.useFakeTimers(10);

describe('Plasmatic', () => {
  context('create application', () => {
    context('when parameters are not specified correctly', () => {
      it('it should throw an Error', () => {
        expect(() => new Plasmatic()).to.throw('Application ID must be specified');
      });
    });

    context('when parameters are set correct', () => {
      it('should create instance of the Plasmatic application', () => {
        const app = new Plasmatic('plasmatic-app');

        expect(app).to.exist;
      });
    });
  });

  context('bind to DOMContentLoaded', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers(10);
      fakeComponent = document.createElement('div');
      fakeSelector = sinon.stub(document, 'querySelectorAll').returns([fakeComponent]);
      doc = sinon.stub(document, 'addEventListener', (event, run) => {
        run();
      });
    });

    afterEach(() => {
      clock.restore();
      fakeSelector.restore();
      doc.restore();
    });

    it('should throw and error when mount poin is not in document', () => {
      fakeSelector.restore();
      expect(() => new Plasmatic('plasmatic-app')).to.throw('Application mount point [pm-component="plasmatic-app"] not found');
    });

    it('should correctly bind and run', () => {
      const app = new Plasmatic('plasmatic-app');

      expect(doc).to.be.called;
      expect(fakeSelector).to.be.called;
      expect(app.$startMicroseconds).to.be.eql(10);
      expect(app.$applicationContainer).to.be.eql(fakeComponent);
    });

    context('render', () => {
      it('should not mount application when mount point is not specified', () => {
        expect(() => new Plasmatic('plasmatic-app').render()).to.throw('Application render method called without Plasmatic component');
      });

      it('should mount application', () => {
        const app = new Plasmatic('plasmatic-app');
        const mountPoint = new PlasmaticNode('div');

        app.render(mountPoint);
        app.mountApplication();

        expect(app.$mountPoint).to.be.eql(mountPoint);
      });
    });
  });
});
