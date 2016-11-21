'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Basic index is created', (t) => {
  var src = 'test/fixtures/basic'

  Metalsmith(src)
    .use(plugin())
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', (t) => {
  const data = require('./fixtures/basic/build/index.json')
  const index = elasticlunr.Index.load(data)
  t.equal(Object.keys(index.documentStore.docs).length, 3, 'index has 3 documents')
  t.end()
})