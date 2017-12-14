'use strict'

const tap = require('tap')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

tap.test('Test preprocess option (single function)', t => {
  var src = 'test/fixtures/preprocess'

  Metalsmith(src)
    .use(plugin({
      fields: [ 'contents' ],
      preprocess: content => content.split('').reverse().join('')
    }))
    .build(assert.indexCreated(t, src))
})

tap.test('Test index contents (single function)', t => {
  const data = require('./fixtures/preprocess/build/index.json')
  const index = elasticlunr.Index.load(data)
  var expected = {
    '2.txt': {
      path: '2.txt',
      contents: 'rehtonA'
    }
  }
  t.deepEqual(index.documentStore.docs, expected, 'single preprocess function applied to content')
  t.end()
})

tap.test('Test preprocess option (multiple functions)', t => {
  var src = 'test/fixtures/preprocess'

  Metalsmith(src)
    .use(plugin({
      fields: [ 'contents' ],
      destFile: 'multiple.json',
      preprocess: [
        content => content.split('').reverse().join(''),
        content => content.toUpperCase()
      ]
    }))
    .build(assert.indexCreated(t, src, 'multiple'))
})

tap.test('Test index contents (multiple functions)', t => {
  const data = require('./fixtures/preprocess/build/multiple.json')
  const index = elasticlunr.Index.load(data)
  var expected = {
    '2.txt': {
      path: '2.txt',
      contents: 'REHTONA'
    }
  }
  t.deepEqual(index.documentStore.docs, expected, 'all preprocess functions applied to content')
  t.end()
})
