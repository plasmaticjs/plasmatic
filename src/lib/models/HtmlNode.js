import PlasmaticNode from './PlasmaticNode';
import type { HtmlNodeType } from './../Types';

class HtmlNode extends PlasmaticNode {
  type: string;
  childNodes: Array<PlasmaticNode>;
  $domReference: HtmlNodeType;

  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>) {
    super(type, props);

    this.childNodes = childNodes;
  }

  toDom(): HTMLElement {
    this.$domReference = document.createElement(this.type);
    return this.$domReference;
  }
}

export default HtmlNode;
