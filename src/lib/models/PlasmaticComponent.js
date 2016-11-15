import DomUtils from 'utils/DomUtils';
import HtmlNode from 'models/HtmlNode';
import TextNode from 'models/TextNode';
import PlasmaticNode from 'models/PlasmaticNode';

class PlasmaticComponent {
  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>): PlasmaticNode {
    let node = false;

    if (DomUtils.isHtmlTag(type)) {
      node = new HtmlNode(type, props, ...childNodes);
    } else {
      node = new TextNode('undefined');

    }

    return node;
  }
}


export default PlasmaticComponent;
