import type { PropsType, PlasmaticNodeJsonType, HtmlNodeType } from './Types';

type StateType = {};

/**
 * Plasmatic default node
 * @example
 * import PlasmaticNode from 'lib/PlasmaticNode';
 *
 * const Node = new PlasmaticNode('a', {href: '/home'});
 * document.body.appendChild(node.toDom());
 */
class PlasmaticNode {
  $domReference: HtmlNodeType;
  childNodes: Array<PlasmaticNode>;
  $parentNode: HTMLElement;
  props: PropsType;
  type: string;
  state: StateType;

  /**
   * @constructor
   * @param {string} type - Dom element type [div, h1, a, img, ...]
   * @param {object} props - Properties map ({src: 'image.png'})
   */
  constructor(type: string, props: mixed) {
    this.type = type;

    if (props !== null && typeof props === 'object') {
      this.props = props;
    } else {
      this.props = {};
    }
  }

  setState(state: StateType) {
    this.state = state;
  }
  /**
   * @private
   */
  getNode(): PlasmaticNode {
    return this;
  }

  /**
   * @private
   * @param type
   */
  setType(type: string) {
    this.type = type;
  }

  /**
   * Get DOM representation of this Node
   * @returns {HtmlNodeType}
   */
  toDom(): HtmlNodeType {
    this.$domReference = document.createTextNode(this.type);
    return this.$domReference;
  }

  /**
   * Get JSON mapping of this Node
   * @returns {{node: PlasmaticNode}}
   */
  toJson(): PlasmaticNodeJsonType {
    return { node: this };
  }

  /**
   * Set parent node in the DOM tree
   * @param {HTMLElement} node - Parent DOM Node
   */
  setParentNode(node: HTMLElement) {
    this.$parentNode = node;
  }

  /**
   * Get parent DOM node
   * @returns {HTMLElement}
   */
  getParentNode(): HTMLElement {
    return this.$parentNode;
  }
}

export default PlasmaticNode;
