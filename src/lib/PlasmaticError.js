/**
 * Error wrapper
 * @module lib/PlasmaticError
 */

/**
 * Get new Plasmatic Error
 * @param msg
 * @returns {Error}
 * @example
 * import err from 'lib/PlasmaticError';
 *
 * throw err('Some error ocurred'); // Throws an error
 */

function PlasmaticError(message: string): boolean {
  return console.error(message); // eslint-disable-line no-console
}

export default PlasmaticError;
