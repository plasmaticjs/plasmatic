import { expect } from 'chai';

import PlasmaticComponent from 'PlasmaticComponent';
import PlasmaticNode from 'PlasmaticNode';
import HtmlNode from 'HtmlNode';
import VDom from 'VDom';

describe('VDom', () => {
  context('createComponent', () => {
    it('should create text Plasmatic Component', () => {
      const component = new PlasmaticComponent('Plasmatic');

      const plasmaticComponent = VDom.createComponent('Plasmatic');

      expect(plasmaticComponent).to.exist;
      expect(plasmaticComponent).to.be.eql(component.node);
    });

    it('should create html Plasmatic Component', () => {
      const component = new PlasmaticComponent('div', { name: 'Plasmatic' }, 'img');
      const plasmaticComponent = VDom.createComponent('div', { name: 'Plasmatic' }, 'img');

      expect(component).to.exist;
      expect(plasmaticComponent).to.be.eql(component.node);
    });
  });

  context('createDomNode', () => {
    it('should create DOM node', () => {
      const node = new PlasmaticNode('div');
      const plasmaticNode = VDom.createDomNode(node);

      expect(plasmaticNode).to.eql(node.toDom());
    });

    it('should create DOM node with childs', () => {
      const childNode = new HtmlNode('img');
      const childNodeDOM = childNode.toDom();

      const parentNode = new HtmlNode('div', {}, childNode);

      const plasmaticNode = VDom.createDomNode(parentNode);

      const firstChild = plasmaticNode.childNodes[0];
      expect(firstChild.toString()).to.be.eql(childNodeDOM.toString());
    });
  });
});
