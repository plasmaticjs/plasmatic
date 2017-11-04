/* Ports of lodash functions
 https://github.com/lodash/lodash
 */

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */

/* eslint-disable flowtype/no-weak-types, no-unused-expressions, no-param-reassign, no-plusplus */
const INFINITY = 1 / 0;

function isFlattenable(value: any): boolean {
  return Array.isArray(value);
}

function baseFlatten(array: Array<mixed>, depth: number, predicate: ?Function, isStrict: ?boolean, result: ?Array<mixed>): Array<mixed> {
  let index = -1;
  const length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    const value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        result.push(value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result || [];
}

function flattenDeep(array: Array<mixed>): Array<mixed> {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}

/* eslint-enable flowtype/no-weak-types, no-unused-expressions, no-param-reassign, no-plusplus */

export default {
  flattenDeep,
};
