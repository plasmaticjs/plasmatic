import type { PropsType, HtmlNodeType } from './Types';
import PlasmaticNode from './PlasmaticNode';
import PlasmaticComponent from './PlasmaticComponent';

class HtmlNode extends PlasmaticNode {
  childNodes: Array<PlasmaticNode>;
  $domReference: HtmlNodeType;

  constructor(type: string, props: mixed, ...childNodes: Array<PlasmaticNode>) {
    super(type, props, ...childNodes);

    // eslint-disable-next-line no-use-before-define
    this.childNodes = childNodes.map((node: PlasmaticNode): PlasmaticNode => {
      if (node && node.node && node.node instanceof PlasmaticNode) {
        return node.node;
      }

      // eslint-disable-next-line no-use-before-define
      const component = new PlasmaticComponent(node).toJson();
      return component.node;
    });
  }

  static setProps(domNode: HTMLElement, props: PropsType) {
    if (props !== null && typeof props === 'object') {
      Object.keys(props).forEach((name: string) => {
        if (Object.prototype.hasOwnProperty.call(props, name)) {
          const value = props[name];
          if (name === 'className') {
            domNode.setAttribute('class', value);
          } else {
            domNode.setAttribute(name, value);
          }
        }
      });
    }
  }

  toDom(): HtmlNodeType {
    this.$domReference = document.createElement(this.type);
    HtmlNode.setProps(this.$domReference, this.props);

    return this.$domReference;
  }
}

export default HtmlNode;
