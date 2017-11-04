import PlasmaticNode from './PlasmaticNode';
import DomUtils from '../utils/DomUtils';
import { HtmlNodeType } from '../Types';


class HtmlNode extends PlasmaticNode {
  type: string;
  childNodes: Array<PlasmaticNode>;
  $domReference: HtmlNodeType;

  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>) {
    super(type, props);

    this.childNodes = childNodes;
    this.isDomElement = true;
  }

  toDom(): HTMLElement {
    this.$domReference = document.createElement(this.type);
    DomUtils.setProps(this.$domReference, this.props);

    if (this.$domReference && this.$parentDomReference) {
      this.$parentDomReference.appendChild(this.$domReference);
    }

    return this.$domReference;
  }
}

export default HtmlNode;