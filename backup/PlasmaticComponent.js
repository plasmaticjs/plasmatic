import type { PlasmaticNodeJsonType } from './Types';

import HtmlNode from './HtmlNode';
import TextNode from './TextNode';
import PlasmaticNode from './PlasmaticNode';
import Component from './interfaces/Component';

class PlasmaticComponent {
  node: TextNode | HtmlNode | PlasmaticNode;

  constructor(type: PlasmaticNode, props: mixed, ...childNodes: Array<PlasmaticNode>) {
    if (PlasmaticComponent.isNodeContent(type) && !PlasmaticComponent.hasChilds(childNodes) && !PlasmaticComponent.hasProps(props)) {
      this.node = new TextNode(String(type));
    } else if (type instanceof HtmlNode || (type && type.type === 'PlasmaticComponent$Instance')) {
      this.node = type;
    } else if (typeof type === 'function' && Object.getPrototypeOf(type) === Component) {
      // eslint-disable-next-line new-cap
      this.node = new type();
    } else if (PlasmaticComponent.isNodeContent(type)) {
      this.node = new HtmlNode(String(type), props, ...childNodes);
    } else {
      this.node = new TextNode('{undefined}');
    }
  }

  static hasProps(props: mixed): boolean {
    if (props && (typeof props === 'object')) {
      return Object.keys(props).length > 0;
    }

    return false;
  }

  static hasChilds(childNodes: Array<PlasmaticNode>): boolean {
    return childNodes.length > 0;
  }

  static isNodeContent(type: mixed): boolean {
    return typeof type === 'string' || typeof type === 'number';
  }

  toJson(): PlasmaticNodeJsonType {
    return this.node.toJson();
  }
}

export default PlasmaticComponent;
