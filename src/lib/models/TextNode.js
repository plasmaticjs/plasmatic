import PlasmaticNode from './PlasmaticNode';
import type { HtmlNodeType } from './../Types';

class TextNode extends PlasmaticNode {
  content: string;
  $domReference: HtmlNodeType;

  constructor(content: string, type: mixed = {}, ...childNodes: Array<PlasmaticNode>) {
    super(content, type, childNodes);
    this.content = content;
  }

  toDom(): Text {
    this.$domReference = document.createTextNode(this.content);
    return this.$domReference;
  }
}

export default TextNode;
