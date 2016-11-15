import PlasmaticComponent from 'models/PlasmaticComponent';
import PlasmaticNode from 'models/PlasmaticNode';
import TextNode from 'models/TextNode';

import type { HtmlNodeType } from 'lib/Types';

function createComponent(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>): PlasmaticNode {
  return new PlasmaticComponent(type, props, ...childNodes);
}

function createLiteral(content: string): PlasmaticNode {
  return new TextNode(content);
}

function createDomNode(node: PlasmaticNode): HtmlNodeType {
  const domNode = node.toDom();

  if (node.childNodes) {
    node.childNodes.forEach((childNode: PlasmaticNode) => {
      createDomNode(childNode);
      domNode.appendChild(childNode.$domReference);
    });
  }

  return domNode;
}


export default {
  createLiteral,
  createComponent,
  createDomNode,
};

