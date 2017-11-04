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

function nodeCycle(node: PlasmaticNode, parentReference: PlasmaticNode): HtmlNodeType {
  node.setParentReference(parentReference);
  const domNode = node.toDom();

  if (node.childNodes) {
    node.childNodes.forEach((childNode: PlasmaticNode) => {
      createDomNode(childNode, node.$domReference); // eslint-disable-line no-use-before-define
    });
  }

  return domNode;
}
function createDomNode(node: PlasmaticNode, parentReference: PlasmaticNode): HtmlNodeType {
  let parent = parentReference;

  if (!parent) {
    // If parent child is missing we need to create parent
    parent = document.createElement('div');
  }

  // Ability to iterate trough multiple nodes
  if (Array.isArray(node)) {
    return node.map((child: PlasmaticNode): HtmlNodeType => nodeCycle(child, parent)); // eslint-disable-line arrow-parens
  }

  nodeCycle(node, parent);
  return parent;
}


export default {
  createLiteral,
  createComponent,
  createDomNode,
};

