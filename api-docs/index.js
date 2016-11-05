import VDom from './lib/VDom';
import Plasmatic from './lib/Plasmatic';
import Component from './lib/interfaces/Component';

export default {
  Component,
  App: Plasmatic,
  createComponent: VDom.createComponent
};