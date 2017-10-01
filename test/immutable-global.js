'use strict'

/* npm modules */
const chai = require('chai')

/* application modules */
const ImmutableGlobal = require('../lib/immutable-global')

/* chai config */
const assert = chai.assert

describe('immutable-global', function () {

    beforeEach(function () {
        ImmutableGlobal.reset(true)
    })

    it('should instantiate new ImmutableGlobal instance', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo')
        // instance data should be object
        assert.isObject(immutableGlobal.data)
        // should have refresh method
        assert.isFunction(immutableGlobal.reset)
        // should register instance
        assert.deepEqual(global.__immutable_global__.__foo__, immutableGlobal)
    })

    it('should have static methods', function () {
        assert.isFunction(ImmutableGlobal.data)
        assert.isFunction(ImmutableGlobal.reset)
    })

    it('should set default data', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo', {foo: true})
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
    })

    it('should reset data from instance', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo', {foo: true})
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
        // modify data
        immutableGlobal.data.foo = false
        // reset data
        immutableGlobal.reset()
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
    })

    it('should reset data globally', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo', {foo: true})
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
        // modify data
        immutableGlobal.data.foo = false
        // reset data
        ImmutableGlobal.reset()
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
    })

    it('should reset internal register when flag set', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo', {foo: true})
        // reset data
        ImmutableGlobal.reset(true)
        // check data
        assert.deepEqual(ImmutableGlobal.data(), {})
    })

    it('should return existing instance for same name', function () {
        // instantiate new instance
        var immutableGlobal = new ImmutableGlobal('foo', {foo: true})
        // create new instance - should return first
        immutableGlobal = new ImmutableGlobal('foo')
        // check data
        assert.deepEqual(immutableGlobal.data, {foo: true})
    })

    it('should throw error when trying to use ImmutableCore', function () {
        assert.throws(() => new ImmutableGlobal('ImmutableGlobal'))
    })

})