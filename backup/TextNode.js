import PlasmaticNode from './PlasmaticNode';

import type { HtmlNodeType } from './Types';
/**
 * Plasmatic TextNode
 * @example
 * import TextNode from 'lib/TextNode';
 *
 * const Node = new TextNode('SomeNode');
 * document.body.appendChild(node.toDom());
 */
class TextNode extends PlasmaticNode {
  content: string;
  childNodes: Array<PlasmaticNode>
  $domReference: HtmlNodeType;

  /**
   * Create new Plasmatic Node
   * @param {string} content - Text content of the node
   * @param {string} type={}
   * @param {...*} childNodes - All child nodes inside the Virtual DOM
   */
  constructor(content: string, type: mixed = {}, ...childNodes: Array<PlasmaticNode>) {
    super(content, type, childNodes);

    this.content = content;
    this.childNodes = [];
  }

  /**
   * Get DOM representation of the current node
   * @returns {Text}
   */
  toDom(): Text {
    this.$domReference = document.createTextNode(this.content);
    return this.$domReference;
  }
}

export default TextNode;
