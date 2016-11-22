'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test preprocess option', t => {
  var src = 'test/fixtures/preprocess'

  Metalsmith(src)
    .use(plugin({
      fields: [ 'contents' ],
      preprocess: content => content.split('').reverse().join('')
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', t => {
  const data = require('./fixtures/preprocess/build/index.json')
  const index = elasticlunr.Index.load(data)
  var expected = {
    '2.txt': {
      path: '2.txt',
      contents: 'rehtonA'
    }
  }
  t.deepEqual(index.documentStore.docs, expected, 'preprocess function applied to content')
  t.end()
})