'use stict'

/* npm modules */
const ImmutableError = require('immutable-error')
const _ = require('lodash')
const changeCase = require('change-case')
const defined = require('if-defined')

/* exports */
module.exports = ImmutableGlobal

/* globals */

// initialize global data
globalReset(true)

// initialize error generator
const immutableError = new ImmutableError({
    class: 'ImmutableGlobal',
    errorCodes: {
        100: 'moduleName required',
        101: 'moduleName not defined',
    },
    nameProperty: 'moduleName',
})

/**
 * @function ImmutableGlobal
 *
 * instantiate new ImmutableGlobal data store
 *
 * @param {string} moduleName
 * @param {object} defaults
 *
 * @returns {ImmutableGlobal}
 */
function ImmutableGlobal (moduleName, defaults) {
    // require valid module name
    this.assert(typeof moduleName === 'string' && moduleName.length > 0, 100)
    // store module name
    this.moduleName = moduleName
    // return existing instance if defined
    if (defined(globalData()[moduleName])) {
        return globalData()[moduleName]
    }
    // register instance
    globalData()[moduleName] = this
    // store defaults
    this.defaults = defaults
    // call reset to initialize data
    this.reset()
}

/* public methods */
ImmutableGlobal.prototype = {
    assert: assert,
    reset: reset,
    throw: _throw,
}

/**
 * @function reset
 *
 * reset global data for instance
 */
function reset () {
    // reset data
    this.data = {}
    // set defaults
    _.merge(this.data, this.defaults)
}

/* static methods */
ImmutableGlobal.assert = assert
ImmutableGlobal.data = globalData
ImmutableGlobal.hasGlobal = hasGlobal
ImmutableGlobal.global = getGlobal
ImmutableGlobal.reset = globalReset
ImmutableGlobal.throw = _throw

/**
 * @function assert
 *
 * assert that value is true - throw error if false
 *
 * @param {boolean} assert
 * @param {number} code
 * @param {string} customMessage
 * @param {Error} original
 * @param {object} data
 *
 * @throws {Error}
 */
function assert (assert, code, customMessage, original, data) {
    return immutableError.assert(assert, this, code, customMessage, original, data)
}

/**
 * @function getGlobal
 *
 * get global data for module - throws error if module not defined
 *
 * @param {string} moduleName
 *
 * @returns {object}
 *
 * @throws {Error}
 */
function getGlobal (moduleName) {
    // require global
    assert(defined(globalData()[moduleName]), 101, `${moduleName} moduleName not defined`)
    // return global instance
    return globalData()[moduleName]
}

/**
 * @function globalData
 *
 * return global data register
 *
 * @returns {object}
 */
function globalData () {
    return global.__immutable_global__
}

/**
 * @function resetData
 *
 * reset global data for all instances. if the self flag is set the internal
 * register will be reset as well (used for testing).
 *
 * @param {boolean} self
 */
function globalReset (self) {
    // reset data for all instances
    _.each(global.__immutable_global__, instance => instance.reset())
    // reset internal data
    if (self) {
        global.__immutable_global__ = {}
    }
}

/**
 * @function hasGlobal
 *
 * return true if module has global data
 *
 * @param {string} moduleName
 *
 * @returns {boolean}
 */
function hasGlobal (moduleName) {
    // check if module has global data
    return defined(globalData()[moduleName])
}

/**
 * @function _throw
 *
 * throw an error
 *
 * @param {number} code
 * @param {string} customMessage
 * @param {Error} original
 * @param {object} data
 *
 * @throws {Error}
 */
function _throw (code, customMessage, original, data) {
    immutableError.throw(this, code, customMessage, original, data)
}