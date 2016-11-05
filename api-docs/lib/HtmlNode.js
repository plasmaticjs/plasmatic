
import PlasmaticNode from './PlasmaticNode';
import PlasmaticComponent from './PlasmaticComponent';

class HtmlNode extends PlasmaticNode {

  constructor(type, props, ...childNodes) {
    super(type, props, ...childNodes);

    // eslint-disable-next-line no-use-before-define
    this.childNodes = childNodes.map(node => {
      if (node && node.node && node.node instanceof PlasmaticNode) {
        return node.node;
      }

      // eslint-disable-next-line no-use-before-define
      const component = new PlasmaticComponent(node).toJson();
      return component.node;
    });
  }

  static setProps(domNode, props) {
    if (props !== null && typeof props === 'object') {
      Object.keys(props).forEach(name => {
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

  toDom() {
    this.$domReference = document.createElement(this.type);
    HtmlNode.setProps(this.$domReference, this.props);

    return this.$domReference;
  }
}

export default HtmlNode;