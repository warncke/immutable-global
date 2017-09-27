'use stict'

/* npm modules */
const _ = require('lodash')
const changeCase = require('change-case')
const defined = require('if-defined')

/* exports */
module.exports = ImmutableGlobal

// initialize global data
globalReset(true)

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
    if (typeof moduleName !== 'string' || !moduleName.length) {
        throw new Error('moduleName required')
    }
    // get property name for module
    this.globalProperty = `__${changeCase.snakeCase(moduleName)}__`
    // do not allow this module name to be used
    if (this.globalProperty === '__immutable_global__') {
        throw new Error('invalid moduleName')
    }
    // return existing instance if defined
    if (defined(globalData()[this.globalProperty])) {
        return globalData()[this.globalProperty]
    }
    // register instance
    globalData()[this.globalProperty] = this
    // store defaults
    this.defaults = defaults
    // call reset to initialize data
    this.reset()
}

/* public methods */
ImmutableGlobal.prototype = {
    reset: reset,
}

/**
 * @function reset
 *
 * reset global data for instance
 */
function reset () {
    // reset data
    this.data = global[this.globalProperty] = {}
    // set defaults
    _.merge(this.data, this.defaults)
}

/* static methods */
ImmutableGlobal.data = globalData
ImmutableGlobal.reset = globalReset

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