import { expect } from 'chai';
import TextNode from 'TextNode';

describe('TextNode', () => {
  it('should instantiate new TextNode', () => {
    const node = new TextNode('Text Node');

    expect(node).to.exist;
    expect(node.content).to.be.eql('Text Node');
  });

  it('should return correct DOM representation', () => {
    const node = new TextNode('Text Node');
    const createNode = document.createTextNode('Text Node');

    expect(node).to.exist;
    expect(node.toDom()).to.be.eql(createNode);
    expect(node.$domReference).to.be.eql(createNode);
  });

  it('should return correct DOM representation without childNodes', () => {
    const node = new TextNode('Text Node', {}, 'Dummy', 'Dummy');
    const createNode = document.createTextNode('Text Node');

    expect(node).to.exist;
    expect(node.toDom()).to.be.eql(createNode);
    expect(node.$domReference).to.be.eql(createNode);
    expect(node.childNodes).to.be.eql([]);
  });
});
