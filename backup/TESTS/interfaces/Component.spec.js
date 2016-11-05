import sinon from 'sinon';
import { expect } from 'chai';

import Component from 'interfaces/Component';
import VDomDiff from 'VDomDiff';

let diff = null;

context('Component', () => {
  beforeEach(() => {
    diff = sinon.stub(VDomDiff.prototype, 'patch');
  });

  afterEach(() => {
    diff.restore();
  });

  context('instantiate', () => {
    it('should create and set props, state', () => {
      const component = new Component({ src: 'image.png' }, { name: 'Plasmatic' });

      expect(component.props).to.be.eql({ src: 'image.png' });
    });
  });

  context('toJson', () => {
    it('should serialize component to JSON', () => {
      const component = new Component();

      expect(component.toJson()).to.be.eql({ node: component });
    });
  });

  context('setState', () => {
    it('should set state on component', () => {
      const component = new Component();
      component.setState({ src: 'image.png' });

      expect(component.state).to.be.eql({ src: 'image.png' });
    });
  });

  context('toDom', () => {
    it('should render to DOM object', () => {
      const component = new Component();

      expect(component.toDom().textContent).to.be.eql('PlasmaticComponent');
      expect(component.type).to.be.eql('PlasmaticComponent$Instance');
      expect(component.props).to.be.eql(undefined);
    });
  });
});
