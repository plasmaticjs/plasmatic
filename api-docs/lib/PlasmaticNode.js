

/**
 * Plasmatic default node
 * @example
 * import PlasmaticNode from 'lib/PlasmaticNode';
 *
 * const Node = new PlasmaticNode('a', {href: '/home'});
 * document.body.appendChild(node.toDom());
 */
class PlasmaticNode {

  /**
   * @constructor
   * @param {string} type - Dom element type [div, h1, a, img, ...]
   * @param {object} props - Properties map ({src: 'image.png'})
   */
  constructor(type, props) {
    this.type = type;

    if (props !== null && typeof props === 'object') {
      this.props = props;
    } else {
      this.props = {};
    }
  }

  setState(state) {
    this.state = state;
  }
  /**
   * @private
   */
  getNode() {
    return this;
  }

  /**
   * @private
   * @param type
   */
  setType(type) {
    this.type = type;
  }

  /**
   * Get DOM representation of this Node
   * @returns {HtmlNodeType}
   */
  toDom() {
    this.$domReference = document.createTextNode(this.type);
    return this.$domReference;
  }

  /**
   * Get JSON mapping of this Node
   * @returns {{node: PlasmaticNode}}
   */
  toJson() {
    return { node: this };
  }

  /**
   * Set parent node in the DOM tree
   * @param {HTMLElement} node - Parent DOM Node
   */
  setParentNode(node) {
    this.$parentNode = node;
  }

  /**
   * Get parent DOM node
   * @returns {HTMLElement}
   */
  getParentNode() {
    return this.$parentNode;
  }
}

export default PlasmaticNode;