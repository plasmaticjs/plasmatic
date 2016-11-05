import PlasmaticNode from './PlasmaticNode';

/**
 * Plasmatic TextNode
 * @example
 * import TextNode from 'lib/TextNode';
 *
 * const Node = new TextNode('SomeNode');
 * document.body.appendChild(node.toDom());
 */
class TextNode extends PlasmaticNode {

  /**
   * Create new Plasmatic Node
   * @param {string} content - Text content of the node
   * @param {string} type={}
   * @param {...*} childNodes - All child nodes inside the Virtual DOM
   */
  constructor(content, type = {}, ...childNodes) {
    super(content, type, childNodes);

    this.content = content;
    this.childNodes = [];
  }

  /**
   * Get DOM representation of the current node
   * @returns {Text}
   */
  toDom() {
    this.$domReference = document.createTextNode(this.content);
    return this.$domReference;
  }
}

export default TextNode;