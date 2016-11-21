'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test ref option', (t) => {
  var src = 'test/fixtures/ref'

  Metalsmith(src)
    .use(plugin({
      ref: 'title'
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', (t) => {
  const data = require('./fixtures/ref/build/index.json')
  const index = elasticlunr.Index.load(data)
  t.equal(Object.keys(index.documentStore.docs).length, 4, 'index has 4 documents')
  t.deepEqual(Object.keys(index.documentStore.docs).sort(), [ 'Four', 'One', 'Three', 'Two' ], 'index ID by title')
  t.end()
})