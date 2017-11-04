import PlasmaticNode from './models/PlasmaticNode';


export type ComponentType = {
  type: mixed;
  props: mixed;
  children: mixed;
};

export type PropsType = {};

export type PlasmaticNodeJsonType = {
  node: PlasmaticNode
};

export type HtmlNodeType = HTMLElement | Text;