const yaml = require('js-yaml');

//------------------------------------------------------------------
// Private functions
//------------------------------------------------------------------

/**
 * Recursion function to delete target
 * @param {object} obj object of yaml
 * @param {string} target target of yaml key
 */
const deleteTargetRecursion = (obj, target) => {
  Object.keys(obj)
    .filter(key => obj[key])
    .forEach((key) => {
      if (key === target) {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        deleteTargetRecursion(obj[key], target);
      }
    });
};

/**
 * Recursion function to empty target
 * @param {object} obj object of yaml
 * @param {string} target target of yaml key
 */
const emptyTargetRecursion = (obj, target) => {
  Object.keys(obj)
    .filter(key => obj[key])
    .forEach((key) => {
      if (key === target) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = '';
      } else if (typeof obj[key] === 'object') {
        emptyTargetRecursion(obj[key], target);
      }
    });
};

/**
 * Recursion function to delete parent of target
 * @param {object} obj object of yaml
 * @param {string} target target of yaml key
 */
const deleteParentRecursion = (obj, target) => {
  Object.keys(obj)
    .forEach((key) => {
      if (obj[key][target]) {
        // eslint-disable-next-line no-param-reassign
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        deleteParentRecursion(obj[key], target);
      }
    });
};

//------------------------------------------------------------------
// Private class
//------------------------------------------------------------------

/**
 * class of yaml-scraper
 */
class Scraper {
  /**
   * constructor of class
   * @param {string} input
   */
  constructor(input) {
    // validate input
    if (!input) {
      throw new Error('input is falsy.');
    }

    // generate object from input
    const obj = (typeof input === 'string')
      ? yaml.safeLoad(input)
      : input;
    if (!obj) {
      throw new Error('Loading yaml is failed.');
    }

    // set obj
    this.value = obj;
  }

  /**
   * Delete target
   * @param {string} target target key of scrap
   */
  delete(target) {
    deleteTargetRecursion(this.value, target);
    return this;
  }

  /**
   * Empty target
   * @param {string} target target key of scrap
   */
  empty(target) {
    emptyTargetRecursion(this.value, target);
    return this;
  }

  /**
   * Delete parent of target
   * @param {string} target target key of scrap
   */
  deleteParent(target) {
    deleteParentRecursion(this.value, target);
    return this;
  }

  /**
   * Generate yaml string
   */
  toString() {
    return yaml.safeDump(this.value);
  }

  /**
   * Generate JavaScript object
   */
  toObject() {
    return this.value;
  }
}

//------------------------------------------------------------------
// Public function
//------------------------------------------------------------------

/**
 * return instance of class Scraper
 */
module.exports = input => new Scraper(input);
