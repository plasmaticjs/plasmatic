import { expect } from 'chai';
import HtmlNode from 'HtmlNode';
import PlasmaticNode from 'PlasmaticNode';

describe('HtmlNode', () => {
  it('should instantiate new HtmlNode', () => {
    const node = new HtmlNode('div');

    expect(node).to.exist;
  });

  context('childNodes', () => {
    it('should instantiate new HtmlNode from PlasmaticNode', () => {
      const plasmaticNode = new PlasmaticNode('div');
      const node = new HtmlNode('div', {}, plasmaticNode.toJson());

      expect(node).to.exists;
      expect(node.childNodes).to.eql([plasmaticNode]);
    });

    it('should instantiate new HtmlNode from HtmlNode', () => {
      const anyNode = new HtmlNode('div');
      const node = new HtmlNode('div', {}, anyNode);

      expect(node).to.exists;
      expect(node.childNodes).to.eql([anyNode]);
    });
  });

  it('should set props', () => {
    const props = { name: 'Plasmatic' };
    const node = new HtmlNode('div', props);

    expect(node).to.exist;
    expect(node.props).to.be.eql(props);
  });

  context('toDom', () => {
    it('should return correct DOM representation', () => {
      const node = new HtmlNode('div');
      const createNode = document.createElement('div');

      expect(node.toDom()).to.eql(createNode);
    });
  });

  context('setProps', () => {
    it('should set props on any component', () => {
      const node = new HtmlNode('img');
      node.toDom();
      HtmlNode.setProps(node.$domReference, { src: 'image.png' });

      const createNode = document.createElement('img');
      createNode.setAttribute('src', 'image.png');

      expect(node.$domReference).to.eql(createNode);
    });

    it('should not set props if they are not passed ', () => {
      const node = new HtmlNode('img');
      node.toDom();
      HtmlNode.setProps(node.$domReference, null);

      const createNode = document.createElement('img');

      expect(node.$domReference).to.eql(createNode);
    });

    it('should not set props if they are wrong ', () => {
      const node = new HtmlNode('img');
      node.toDom();
      HtmlNode.setProps(node.$domReference, 'INCORRECT_PROPS');

      const createNode = document.createElement('img');

      expect(node.$domReference).to.eql(createNode);
    });

    it('should set className', () => {
      const node = new HtmlNode('img');
      node.toDom();
      HtmlNode.setProps(node.$domReference, { className: 'plasmatic' });

      const createNode = document.createElement('img');
      createNode.setAttribute('class', 'plasmatic');

      expect(node.$domReference).to.eql(createNode);
    });
  });
});
