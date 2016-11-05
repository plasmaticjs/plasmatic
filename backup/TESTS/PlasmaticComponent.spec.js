import { expect } from 'chai';

import TextNode from 'TextNode';
import HtmlNode from 'HtmlNode';
import Component from 'interfaces/Component';
import PlasmaticComponent from 'PlasmaticComponent';

class ComponentStub extends Component {}

context('PlasmaticComponent', () => {
  context('instantiate', () => {
    context('create new component', () => {
      it('when type is string', () => {
        const component = new PlasmaticComponent('Plasmatic');
        const node = new TextNode('Plasmatic');

        expect(component.node).to.eql(node);
      });

      it('when type is HtmlNode', () => {
        const node = new HtmlNode('div');
        const component = new PlasmaticComponent(node);

        expect(component.node).to.eql(node);
      });

      it('when type is HTMLElement', () => {
        const node = new HtmlNode('img', { src: 'image.png' });
        const component = new PlasmaticComponent('img', { src: 'image.png' });

        expect(component.node).to.eql(node);
      });

      it('when type is Ambigious', () => {
        const node = new Error({ src: 'image.png' });
        const component = new PlasmaticComponent(node);

        expect(component.node).to.not.be.eql(node);
      });

      it('when type is correct Component.prototype', () => {
        const component = new PlasmaticComponent(ComponentStub);
        const createComponent = new ComponentStub();

        expect(component.node).to.be.eql(createComponent);
      });
    });

    context('hasProps', () => {
      it('should evalute if component has not props', () => {
        const component = new PlasmaticComponent('Plasmatic');

        expect(PlasmaticComponent.hasProps(component.props)).to.be.false;
      });
      it('should evalute if component has not props when they are invalid', () => {
        const component = new PlasmaticComponent('Plasmatic', 'INCORRECT_PROPS');

        expect(PlasmaticComponent.hasProps(component.props)).to.be.false;
      });
    });
  });
});
