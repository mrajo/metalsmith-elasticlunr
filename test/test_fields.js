'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test fields option', t => {
  var src = 'test/fixtures/fields'

  Metalsmith(src)
    .use(plugin({
      ref: 'title',
      fields: [ 'title' ]
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', t => {
  const data = require('./fixtures/fields/build/index.json')
  const index = elasticlunr.Index.load(data)
  t.deepEqual(index.documentStore.docs, { One: { title: 'One' } }, 'index only has title fields')
  t.end()
})