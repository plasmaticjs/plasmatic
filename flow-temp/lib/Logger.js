/**
 * Logging utilites
 * @module lib/Logger
 */

/* eslint-disable no-console */
/**
 * @constant
 * @type {string}
 * @default
 */
const banner = '[PLASMATIC]';

/**
 * Invoke console method function. Console method is invoked only when process.env.NODE_ENV is one of [test, development]
 * @param {string} type - Console method [log, info, error, debug, ...]
 * @param {...*} - List of arguments
 * @example
 * Logger.consl('log', 'This', 'will', 'be', 'printed'); // [Plasmatic] This will be printed
 */
function consl(type: string, ...args: Array<mixed>) {
  // eslint-disable-next-line no-underscore-dangle
  const env = process.env.NODE_ENV || window && window.__env__ && window.__env__.NODE_ENV;

  if (['test', 'development'].indexOf(env) > -1) {
    console[type](...args);
  }
}

/**
 * Call console.log with arguments
 * @param {...*} - Arguments to log to the console
 * @returns {Array}
 * @example
 * Logger.log('This', 'will', 'be', 'printed'); // [Plasmatic] This will be printed
 */
function log(...args: Array<mixed>): Array<mixed> {
  args.unshift(banner);
  consl('log', ...args);

  return ['log', ...args];
}

/**
 * Call console.info with arguments
 * @param {...*} - Arguments to log to the console
 * @returns {Array}
 * @example
 * Logger.info('This', 'will', 'be', 'printed'); // [Plasmatic] This will be printed
 */
function info(...args: Array<mixed>): Array<mixed> {
  args.unshift(banner);
  consl('info', ...args);

  return ['info', ...args];
}

/**
 * Print debugging information with time measurment to the console
 * @param {String} msg - Message to be printed
 * @param {Number} [startTime] - Starting time of the measurment
 * @param {Number} [endTime=new Date().getTime()] - Ending time of the measurment
 * @returns {Array}
 * @example
 * Logger.debug('This will be printend'); // [Plasmatic] This will be printed
 * Logger.debug('This will be printend', -1); // [Plasmatic] This will be printed [0ms]
 * Logger.debug('This will be printend', 100, 111); // [Plasmatic] This will be printed [10ms]
 * Logger.debug('This will be printend', -1, (new Date().getTime() + 10)); // [Plasmatic] This will be printed [10ms]
 */
function debug(msg: string, startTime: number, endTime: ?number): Array<mixed> {
  let end = endTime;
  let start = startTime;
  const args = [msg];

  args.unshift(banner);
  if (start === -1) {
    start = new Date().getTime();
  }

  if (typeof start === 'number' && typeof end !== 'number') {
    end = new Date().getTime();
  }

  if (start && end) {
    args.push(`[${ end - start }ms]`);
  }

  consl('info', ...args);
  return ['info', ...args];
}
/* eslint-disable no-console */

export default {
  log,
  info,
  debug,
  consl
};