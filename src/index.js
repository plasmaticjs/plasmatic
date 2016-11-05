import Renderer from './lib/Renderer';
import Plasmatic from './lib/Plasmatic';

export default {
  App: Plasmatic,
  createComponent: Renderer.createComponent,
  createLiteral: Renderer.createLiteral,
};
