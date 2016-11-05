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

class PlasmaticError {
  constructor(msg: string): Error {
    const err = new Error(msg);
    err.name = 'Plasmatic Error';

    return err;
  }
}

export default PlasmaticError;
