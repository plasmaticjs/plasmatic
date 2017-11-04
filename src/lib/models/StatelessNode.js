import PlasmaticNode from 'models/PlasmaticNode';
import Renderer from 'lib/Renderer';

import type { HtmlNodeType } from 'lib/Types';

class StatelessNode extends PlasmaticNode {
  type: string;
  childNodes: Array<PlasmaticNode>;
  $domReference: HtmlNodeType;

  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>) {
    super(type, props);

    this.childNodes = childNodes;
  }

  toDom(): HTMLElement {
    const data = this.type(this.props);

    if (data.isDomElement && data.$domReference && this.$parentDomReference) {
      this.$parentDomReference.appendChild(data.$domReference);
    }

    this.$domReference = Renderer.createDomNode(data, this.$parentDomReference);
    return this.$domReference;
  }
}

export default StatelessNode;
