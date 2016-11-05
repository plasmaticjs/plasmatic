import { expect } from 'chai';
import PlasmaticNode from 'PlasmaticNode';

describe('PlasmaticNode', () => {
  context('instance', () => {
    it('when props are specified', () => {
      const node = new PlasmaticNode('img', { src: 'image.png' });

      expect(node).to.exist;
      expect(node.type).to.be.eql('img');
      expect(node.props).to.be.eql({ src: 'image.png' });
    });

    it('when incorrect props are specified', () => {
      const node = new PlasmaticNode('img', 'INCORRECT_PROPS');

      expect(node).to.exist;
      expect(node.type).to.be.eql('img');
      expect(node.props).to.be.eql({});
    });

    it('when props are not specified ', () => {
      const node = new PlasmaticNode('img');

      expect(node).to.exist;
      expect(node.type).to.be.eql('img');
      expect(node.props).to.be.eql({});
    });
  });

  context('getNode', () => {
    it('should return self for chaining', () => {
      const node = new PlasmaticNode('img');

      expect(node).to.exist;
      expect(node.getNode()).to.be.eql(node);
    });
  });

  context('toJson', () => {
    it('should return correct JSON', () => {
      const node = new PlasmaticNode('img');

      expect(node).to.exist;
      expect(node.toJson()).to.be.eql({ node });
    });
  });

  context('setType', () => {
    it('should set a type of node', () => {
      const node = new PlasmaticNode('img');
      node.setType('h1');

      expect(node).to.exist;
      expect(node.type).to.be.eql('h1');
    });
  });

  context('toDom', () => {
    it('should return the DOM representation', () => {
      const node = new PlasmaticNode('img');
      const textNode = document.createTextNode('img');

      expect(node).to.exist;
      expect(node.toDom()).to.be.eql(textNode);
    });
  });

  context('setParentNode', () => {
    it('should set the parent node', () => {
      const node = new PlasmaticNode('h1');
      const parentNode = document.createElement('div');

      node.setParentNode(parentNode);

      expect(node).to.exist;
      expect(node.getParentNode()).to.be.eql(parentNode);
    });
  });

  context('setState', () => {
    it('should set state on node', () => {
      const node = new PlasmaticNode('img');
      node.setState({ src: 'image.png' });

      expect(node.state).to.be.eql({ src: 'image.png' });
    });
  });
});
