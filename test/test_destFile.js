'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test destFile option', (t) => {
  var src = 'test/fixtures/destFile'

  Metalsmith(src)
    .use(plugin({
      destFile: 'foo.json',
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})