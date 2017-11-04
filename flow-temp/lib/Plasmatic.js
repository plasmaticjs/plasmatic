import plasmaticError from './PlasmaticError';
import Logger from './Logger';
import Renderer from './Renderer';
import PlasmaticNode from './models/PlasmaticNode';

/**
 * Plasmatic library
 * @example <caption> index.js </caption>
 * import Plasmatic from 'plasmatic';
 *
 * const App = new Plasmatic.App('plasmatic-app');
 *
 * App.render(
 *  <div>
 *    My Application
 *  </div>
 * );
 * @example <caption> index.html </caption>
 * <html>
 *  <head>
 *    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
 *    <title>Plasmatic App</title>
 *  </head>
 *  <body>
 *    <div pm-component="plasmatic-app"></div>
 *  </body>
 * </html>
 */

class Plasmatic {
  $applicationContainer: HTMLElement;
  $startMicroseconds: number;
  $mountPoint: PlasmaticNode;
  $applicationId: string;

  /**
   * @constructor
   * @param {string} applicationId - Application ID and also mount point of an application [pm-component=applicationId]
   */
  constructor(applicationId: string) {
    if (!applicationId) {
      plasmaticError('Application ID must be specified');
    }
    this.$applicationId = applicationId;

    document.addEventListener('DOMContentLoaded', () => {
      this.run();
    });

    Logger.info(`Plasmatic is running application (${ this.$applicationId })`);
  }

  /**
   * Render application on specified mount point
   * @param {jsx} mountPoint - JSX Markup for mount point
   * @example
   * import Plasmatic from 'plasmatic';
   *
   * const App = new Plasmatic.App('plasmatic-app');
   *
   * App.render(
   *  <div>
   *    My Application
   *  </div>
   * );
   */
  render(mountPoint: PlasmaticNode) {
    if (!mountPoint) {
      plasmaticError('Application render method called without Plasmatic component');
    } else {
      this.$mountPoint = mountPoint;
    }
  }

  /**
   * @private
   */
  run() {
    this.$startMicroseconds = new Date().getTime();
    Logger.debug('DOM Content Loaded', this.$startMicroseconds);

    this.$applicationContainer = document.querySelectorAll(`[pm-component="${ this.$applicationId }"]`)[0];
    if (!this.$applicationContainer) {
      plasmaticError(`Application mount point [pm-component="${ this.$applicationId }"] not found`);
    } else {
      this.mountApplication();
      Logger.debug('Application mounted', this.$startMicroseconds);
    }
  }

  /**
   * @private
   */
  mountApplication() {
    if (this.$mountPoint) {
      Renderer.createDomNode(this.$mountPoint, this.$applicationContainer);
    }
  }
}

export default Plasmatic;