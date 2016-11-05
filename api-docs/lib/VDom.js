import VDomDiff from './VDomDiff';
import PlasmaticNode from './PlasmaticNode';
import PlasmaticComponent from './PlasmaticComponent';

function createComponent(type, props, ...childNodes) {
  const comp = new PlasmaticComponent(type, props, ...childNodes);
  return comp.node;
}

function createDomNode(component) {
  const newDomNode = component.toDom();

  if (component.childNodes) {
    component.childNodes.forEach(node => {
      createDomNode(node);
      newDomNode.appendChild(node.$domReference);
    });
  }

  return newDomNode;
}

export default {
  createComponent,
  createDomNode,
  Diff: VDomDiff
};