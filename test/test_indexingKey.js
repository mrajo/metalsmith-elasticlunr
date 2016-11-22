'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test indexingKey option', t => {
  var src = 'test/fixtures/indexingKey'

  Metalsmith(src)
    .use(plugin({
      indexingKey: 'search'
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', t => {
  const data = require('./fixtures/indexingKey/build/index.json')
  const index = elasticlunr.Index.load(data)
  t.equal(Object.keys(index.documentStore.docs).length, 1, 'index has 1 document')
  t.end()
})