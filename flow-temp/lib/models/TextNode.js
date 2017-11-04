import PlasmaticNode from './PlasmaticNode';
import { HtmlNodeType } from '../Types';


class TextNode extends PlasmaticNode {
  content: string;
  $domReference: HtmlNodeType;

  constructor(content: string, type = {}, ...childNodes: Array<PlasmaticNode>) {
    super(content, type, childNodes);
    this.content = content;
    this.isDomElement = true;
  }

  toDom(): Text {
    this.$domReference = document.createTextNode(this.content);

    if (this.$domReference && this.$parentDomReference) {
      this.$parentDomReference.appendChild(this.$domReference);
    }

    return this.$domReference;
  }
}

export default TextNode;