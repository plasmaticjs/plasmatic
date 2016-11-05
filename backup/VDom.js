import VDomDiff from './VDomDiff';
import PlasmaticNode from './PlasmaticNode';
import PlasmaticComponent from './PlasmaticComponent';

import type { HtmlNodeType } from './Types';

function createComponent(type: PlasmaticNode, props: mixed, ...childNodes: Array<PlasmaticNode>): PlasmaticNode {
  console.log(arguments);
  //const comp = new PlasmaticComponent(type, props, ...childNodes);
  //return comp.node;
}

function createDomNode(component: PlasmaticNode): HtmlNodeType {
  const newDomNode = component.toDom();

  if (component.childNodes) {
    component.childNodes.forEach((node: PlasmaticNode) => {
      createDomNode(node);
      newDomNode.appendChild(node.$domReference);
    });
  }

  return newDomNode;
}

function createLiteral(content) {
  console.log('Create literal', content)
}

export default {
  createLiteral,
  createDomNode,
  Diff: VDomDiff,
  createComponent,
};

