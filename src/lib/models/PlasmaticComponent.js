import DomUtils from 'utils/DomUtils';
import HtmlNode from 'models/HtmlNode';
import TextNode from 'models/TextNode';
import PlasmaticNode from 'models/PlasmaticNode';
import StatelessNode from 'models/StatelessNode';

import _ from 'utils/LodashPorts';

class PlasmaticComponent {
  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>): PlasmaticNode {
    let node = false;

    const childs = _.flattenDeep(childNodes.map((child: PlasmaticNode | string): Array<PlasmaticNode> => {
      if (!(child instanceof PlasmaticNode) && typeof child === 'string') {
        return new TextNode(child);
      }

      return child;
    }));

    if (DomUtils.isHtmlTag(type)) {
      node = new HtmlNode(type, props, ...childs);
    } else if (typeof type === 'function') {
      node = new StatelessNode(type, props, ...childs);
    } else {
      node = new TextNode('undefined');
    }

    return node;
  }
}


export default PlasmaticComponent;
