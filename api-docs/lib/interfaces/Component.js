

import VDom from '../VDom';
import PlasmaticNode from '../PlasmaticNode';

class Component extends PlasmaticNode {

  constructor(props, state) {
    super('PlasmaticComponent$Instance', {});

    this.props = props;
    this.state = state || {};

    this.initialize();
    this.setNode(this.render());
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {}

  toJson() {
    return { node: this };
  }

  toDom() {
    this.setNode(this.render());
    this.$domReference = VDom.createDomNode(this.$node);
    return this.$domReference;
  }

  domContent() {
    return VDom.createDomNode(this.render());
  }

  setState(state) {
    this.state = state;

    const oldNode = this.$domReference;
    const newNode = this.domContent();
    new VDom.Diff(newNode, oldNode).applyPatch();
  }

  setNode(node) {
    this.$node = node;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return new PlasmaticNode('PlasmaticComponent', {});
  }
}

export default Component;